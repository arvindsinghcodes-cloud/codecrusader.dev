package dev.codecrusader.backend.repository;

import dev.codecrusader.backend.domain.ScheduleSlot;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ScheduleSlotRepository extends JpaRepository<ScheduleSlot, Long> {
    List<ScheduleSlot> findAllByOrderByOrderIndexAsc();
}
