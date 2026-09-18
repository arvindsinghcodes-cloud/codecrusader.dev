package dev.codecrusader.backend.dto.content;

import dev.codecrusader.backend.domain.Video;

public record VideoResponse(String title, String tag, String duration, String desc) {
    public static VideoResponse from(Video video) {
        return new VideoResponse(video.getTitle(), video.getTag(), video.getDuration(), video.getDescription());
    }
}
