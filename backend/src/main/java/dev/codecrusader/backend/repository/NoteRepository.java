package dev.codecrusader.backend.repository;

import dev.codecrusader.backend.domain.Note;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NoteRepository extends JpaRepository<Note, Long> {
    List<Note> findAllByOrderByOrderIndexAsc();
}
