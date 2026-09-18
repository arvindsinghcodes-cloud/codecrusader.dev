package dev.codecrusader.backend.dto.practice;

import dev.codecrusader.backend.domain.Problem;

public record ProblemResponse(String name, String difficulty, String tags) {
    public static ProblemResponse from(Problem problem) {
        return new ProblemResponse(problem.getName(), problem.getDifficulty(), problem.getTags());
    }
}
