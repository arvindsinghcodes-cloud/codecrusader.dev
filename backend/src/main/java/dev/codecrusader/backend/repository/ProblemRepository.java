package dev.codecrusader.backend.repository;

import dev.codecrusader.backend.domain.Problem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ProblemRepository extends JpaRepository<Problem, Long> {
    List<Problem> findAllByOrderByOrderIndexAsc();

    Optional<Problem> findByNameIgnoreCase(String name);
}
