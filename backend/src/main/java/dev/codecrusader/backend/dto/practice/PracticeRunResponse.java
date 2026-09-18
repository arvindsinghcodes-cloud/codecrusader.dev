package dev.codecrusader.backend.dto.practice;

import java.util.List;

public record PracticeRunResponse(
        boolean passed,
        int executionTimeMs,
        double executionPercentile,
        double memoryMb,
        double memoryPercentile,
        String complexity,
        List<TestCaseResult> cases
) {
}
