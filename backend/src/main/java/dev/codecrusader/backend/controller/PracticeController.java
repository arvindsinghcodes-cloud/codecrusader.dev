package dev.codecrusader.backend.controller;

import dev.codecrusader.backend.dto.practice.PracticeRunRequest;
import dev.codecrusader.backend.dto.practice.PracticeRunResponse;
import dev.codecrusader.backend.dto.practice.ProblemResponse;
import dev.codecrusader.backend.service.PracticeService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/practice")
@RequiredArgsConstructor
public class PracticeController {

    private final PracticeService practiceService;

    @GetMapping("/problems")
    public List<ProblemResponse> problems() {
        return practiceService.listProblems();
    }

    @PostMapping("/run")
    public PracticeRunResponse run(@Valid @RequestBody PracticeRunRequest request) {
        return practiceService.run(request);
    }
}
