package dev.codecrusader.backend.dto.ide;

import jakarta.validation.constraints.NotBlank;

public record IdeChatRequest(
        String activeFile,
        String source,

        @NotBlank(message = "message is required")
        String message
) {
}
