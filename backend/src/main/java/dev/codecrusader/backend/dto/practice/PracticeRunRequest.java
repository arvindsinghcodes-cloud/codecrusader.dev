package dev.codecrusader.backend.dto.practice;

import jakarta.validation.constraints.NotBlank;

public record PracticeRunRequest(
        @NotBlank(message = "problemId is required")
        String problemId,

        @NotBlank(message = "language is required")
        String language,

        @NotBlank(message = "source is required")
        String source
) {
}
