package dev.codecrusader.backend.service;

import dev.codecrusader.backend.dto.practice.PracticeRunRequest;
import dev.codecrusader.backend.dto.practice.PracticeRunResponse;
import dev.codecrusader.backend.dto.practice.ProblemResponse;
import dev.codecrusader.backend.dto.practice.TestCaseResult;
import dev.codecrusader.backend.repository.ProblemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class PracticeService {

    private final ProblemRepository problemRepository;

    public List<ProblemResponse> listProblems() {
        return problemRepository.findAllByOrderByOrderIndexAsc().stream()
                .map(ProblemResponse::from)
                .toList();
    }

    /**
     * Simulates a JVM benchmark run for the submitted source.
     *
     * There is intentionally no real code execution here: running untrusted
     * source code server-side requires a sandboxed runner (e.g. a locked-down
     * container per submission, strict CPU/memory/time limits, no network
     * access) which is a project of its own. Swap this method's body for a
     * call to such a runner when one exists; the request/response shape
     * (source in, pass/fail + timing out) is already what that integration
     * would need.
     */
    public PracticeRunResponse run(PracticeRunRequest request) {
        long seed = (request.problemId() + request.language() + request.source().length()).hashCode();
        Random random = new Random(seed);

        int executionTimeMs = 8 + random.nextInt(20);
        double executionPercentile = 90 + random.nextDouble() * 9.5;
        double memoryMb = 35 + random.nextDouble() * 15;
        double memoryPercentile = 85 + random.nextDouble() * 14;

        List<TestCaseResult> cases = List.of(
                new TestCaseResult("nums = [2,7,11,15], target = 9", "[0,1]"),
                new TestCaseResult("nums = [3,2,4], target = 6", "[1,2]"),
                new TestCaseResult("nums = [3,3], target = 6", "[0,1]"));

        return new PracticeRunResponse(
                true,
                executionTimeMs,
                Math.round(executionPercentile * 10) / 10.0,
                Math.round(memoryMb * 10) / 10.0,
                Math.round(memoryPercentile * 10) / 10.0,
                "O(N) Time",
                cases);
    }
}
