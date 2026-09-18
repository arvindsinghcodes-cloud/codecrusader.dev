package dev.codecrusader.backend.controller;

import dev.codecrusader.backend.dto.auth.AuthResponse;
import dev.codecrusader.backend.dto.auth.LoginRequest;
import dev.codecrusader.backend.dto.auth.SignupRequest;
import dev.codecrusader.backend.dto.auth.UserResponse;
import dev.codecrusader.backend.security.UserPrincipal;
import dev.codecrusader.backend.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/signup")
    @ResponseStatus(HttpStatus.CREATED)
    public AuthResponse signup(@Valid @RequestBody SignupRequest request) {
        return authService.signup(request);
    }

    @PostMapping("/login")
    public AuthResponse login(@Valid @RequestBody LoginRequest request) {
        return authService.login(request);
    }

    @GetMapping("/me")
    public UserResponse me(@AuthenticationPrincipal UserPrincipal principal) {
        return UserResponse.from(principal.getUser());
    }
}
