package dev.codecrusader.backend.dto.content;

import dev.codecrusader.backend.domain.Course;

public record CourseResponse(
        String code, String color, String title, String category,
        int modules, int progress, String progressLabel, String progressColor,
        String cta, String ctaHref, String type, boolean completed
) {
    public static CourseResponse from(Course c) {
        return new CourseResponse(
                c.getCode(), c.getColor(), c.getTitle(), c.getCategory(),
                c.getModules(), c.getProgress(), c.getProgressLabel(), c.getProgressColor(),
                c.getCtaLabel(), c.getCtaHref(), c.getType(), c.isCompleted());
    }
}
