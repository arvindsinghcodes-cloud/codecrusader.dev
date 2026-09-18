package dev.codecrusader.backend.controller;

import dev.codecrusader.backend.dto.content.*;
import dev.codecrusader.backend.service.ContentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class ContentController {

    private final ContentService contentService;

    @GetMapping("/api/videos")
    public List<VideoResponse> videos() {
        return contentService.listVideos();
    }

    @PostMapping("/api/videos")
    @ResponseStatus(HttpStatus.CREATED)
    public VideoResponse createVideo(@Valid @RequestBody VideoRequest request) {
        return contentService.createVideo(request);
    }

    @PutMapping("/api/videos/{id}")
    public VideoResponse updateVideo(@PathVariable Long id, @Valid @RequestBody VideoRequest request) {
        return contentService.updateVideo(id, request);
    }

    @DeleteMapping("/api/videos/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteVideo(@PathVariable Long id) {
        contentService.deleteVideo(id);
    }

    @GetMapping("/api/courses")
    public List<CourseResponse> courses() {
        return contentService.listCourses();
    }

    @GetMapping("/api/schedule")
    public List<ScheduleResponse> schedule() {
        return contentService.listSchedule();
    }

    @GetMapping("/api/campaigns")
    public List<CampaignResponse> campaigns() {
        return contentService.listCampaigns();
    }

    @GetMapping("/api/notes")
    public List<NoteResponse> notes() {
        return contentService.listNotes();
    }
}
