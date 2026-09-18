package dev.codecrusader.backend.dto.content;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record VideoRequest(
        @NotBlank(message = "title is required")
        String title,

        @NotBlank(message = "tag is required")
        String tag,

        @NotBlank(message = "duration is required")
        String duration,

        @NotBlank(message = "desc is required")
        String desc,

        @NotNull(message = "orderIndex is required")
        Integer orderIndex
) {
}
