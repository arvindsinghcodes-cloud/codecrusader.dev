package dev.codecrusader.backend;

import com.fasterxml.jackson.databind.ObjectMapper;
import dev.codecrusader.backend.dto.auth.SignupRequest;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class AuthAndContentApiTests {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void publicContentEndpointsAreReachableWithoutAuth() throws Exception {
        mockMvc.perform(get("/api/videos")).andExpect(status().isOk());
        mockMvc.perform(get("/api/courses")).andExpect(status().isOk());
        mockMvc.perform(get("/api/schedule")).andExpect(status().isOk());
        mockMvc.perform(get("/api/campaigns")).andExpect(status().isOk());
        mockMvc.perform(get("/api/notes")).andExpect(status().isOk());
        mockMvc.perform(get("/api/practice/problems")).andExpect(status().isOk());
    }

    @Test
    void meEndpointRequiresAuthentication() throws Exception {
        mockMvc.perform(get("/api/auth/me")).andExpect(status().isUnauthorized());
    }

    @Test
    void adminOnlyEndpointRejectsAnonymousUser() throws Exception {
        mockMvc.perform(post("/api/videos")).andExpect(status().isUnauthorized());
    }

    @Test
    void signupThenLoginThenMeWorksEndToEnd() throws Exception {
        SignupRequest signup = new SignupRequest("Test User", "test.user@codecrusader.dev", "password123");

        String signupJson = mockMvc.perform(post("/api/auth/signup")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(signup)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.token").exists())
                .andExpect(jsonPath("$.user.email").value("test.user@codecrusader.dev"))
                .andReturn().getResponse().getContentAsString();

        String token = objectMapper.readTree(signupJson).get("token").asText();

        mockMvc.perform(get("/api/auth/me").header("Authorization", "Bearer " + token))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.email").value("test.user@codecrusader.dev"))
                .andExpect(jsonPath("$.role").value("USER"));

        // Signing up twice with the same email must fail.
        mockMvc.perform(post("/api/auth/signup")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(signup)))
                .andExpect(status().isConflict());
    }

    @Test
    void onlyAdminCanManageVideos() throws Exception {
        String adminToken = login("admin@codecrusader.dev", "admin123");
        String studentToken = login("student@codecrusader.dev", "student123");

        String videoJson = """
                {"title":"New Interview Video","tag":"JMM","duration":"10:00","desc":"desc","orderIndex":99}
                """;

        mockMvc.perform(post("/api/videos")
                        .header("Authorization", "Bearer " + studentToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(videoJson))
                .andExpect(status().isForbidden());

        String createdJson = mockMvc.perform(post("/api/videos")
                        .header("Authorization", "Bearer " + adminToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(videoJson))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.title").value("New Interview Video"))
                .andReturn().getResponse().getContentAsString();

        mockMvc.perform(get("/api/videos"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[?(@.title == 'New Interview Video')]").exists());
    }

    private String login(String email, String password) throws Exception {
        String body = mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"email\":\"%s\",\"password\":\"%s\"}".formatted(email, password)))
                .andExpect(status().isOk())
                .andReturn().getResponse().getContentAsString();
        return objectMapper.readTree(body).get("token").asText();
    }

    @Test
    void contactFormAcceptsValidSubmission() throws Exception {
        String body = """
                {
                  "name": "Rahul Sharma",
                  "email": "rahul@example.com",
                  "projectType": "Direct Consultation",
                  "message": "Would like to discuss a project."
                }
                """;

        mockMvc.perform(post("/api/contact").contentType(MediaType.APPLICATION_JSON).content(body))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.received").value(true));
    }
}
