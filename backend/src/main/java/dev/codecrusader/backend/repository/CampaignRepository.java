package dev.codecrusader.backend.repository;

import dev.codecrusader.backend.domain.Campaign;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CampaignRepository extends JpaRepository<Campaign, Long> {
    List<Campaign> findAllByOrderByOrderIndexAsc();
}
