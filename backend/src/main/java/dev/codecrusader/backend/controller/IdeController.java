package dev.codecrusader.backend.controller;

import dev.codecrusader.backend.dto.ide.IdeChatRequest;
import dev.codecrusader.backend.dto.ide.IdeChatResponse;
import dev.codecrusader.backend.service.IdeService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/ide")
@RequiredArgsConstructor
public class IdeController {

    private final IdeService ideService;

    @PostMapping("/chat")
    public IdeChatResponse chat(@Valid @RequestBody IdeChatRequest request) {
        return ideService.chat(request);
    }
}
