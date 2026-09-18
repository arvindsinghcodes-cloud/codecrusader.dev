package dev.codecrusader.backend.repository;

import dev.codecrusader.backend.domain.Video;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface VideoRepository extends JpaRepository<Video, Long> {
    List<Video> findAllByOrderByOrderIndexAsc();
}
