package dev.codecrusader.backend.service;

import dev.codecrusader.backend.domain.Video;
import dev.codecrusader.backend.dto.content.*;
import dev.codecrusader.backend.exception.ResourceNotFoundException;
import dev.codecrusader.backend.repository.CampaignRepository;
import dev.codecrusader.backend.repository.CourseRepository;
import dev.codecrusader.backend.repository.NoteRepository;
import dev.codecrusader.backend.repository.ScheduleSlotRepository;
import dev.codecrusader.backend.repository.VideoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ContentService {

    private final VideoRepository videoRepository;
    private final CourseRepository courseRepository;
    private final ScheduleSlotRepository scheduleSlotRepository;
    private final CampaignRepository campaignRepository;
    private final NoteRepository noteRepository;

    public List<VideoResponse> listVideos() {
        return videoRepository.findAllByOrderByOrderIndexAsc().stream().map(VideoResponse::from).toList();
    }

    public List<CourseResponse> listCourses() {
        return courseRepository.findAllByOrderByIdAsc().stream().map(CourseResponse::from).toList();
    }

    public List<ScheduleResponse> listSchedule() {
        return scheduleSlotRepository.findAllByOrderByOrderIndexAsc().stream().map(ScheduleResponse::from).toList();
    }

    public List<CampaignResponse> listCampaigns() {
        return campaignRepository.findAllByOrderByOrderIndexAsc().stream().map(CampaignResponse::from).toList();
    }

    public List<NoteResponse> listNotes() {
        return noteRepository.findAllByOrderByOrderIndexAsc().stream().map(NoteResponse::from).toList();
    }

    // --- Admin-only video management: the concrete example of the CRUD +
    // RBAC pattern the other content types (courses/schedule/campaigns/notes)
    // would follow the same way once an admin UI needs to manage them. ---

    @Transactional
    public VideoResponse createVideo(VideoRequest request) {
        Video saved = videoRepository.save(Video.builder()
                .title(request.title())
                .tag(request.tag())
                .duration(request.duration())
                .description(request.desc())
                .orderIndex(request.orderIndex())
                .build());
        return VideoResponse.from(saved);
    }

    @Transactional
    public VideoResponse updateVideo(Long id, VideoRequest request) {
        Video video = videoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("No video with id " + id));
        video.setTitle(request.title());
        video.setTag(request.tag());
        video.setDuration(request.duration());
        video.setDescription(request.desc());
        video.setOrderIndex(request.orderIndex());
        return VideoResponse.from(video);
    }

    @Transactional
    public void deleteVideo(Long id) {
        if (!videoRepository.existsById(id)) {
            throw new ResourceNotFoundException("No video with id " + id);
        }
        videoRepository.deleteById(id);
    }
}
