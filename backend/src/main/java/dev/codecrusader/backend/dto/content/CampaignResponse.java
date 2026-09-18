package dev.codecrusader.backend.dto.content;

import dev.codecrusader.backend.domain.Campaign;

import java.util.List;

public record CampaignResponse(
        String number, String title, String accent, int published, int total,
        String description, List<CampaignSegmentResponse> segments
) {
    public static CampaignResponse from(Campaign c) {
        return new CampaignResponse(
                c.getNumber(), c.getTitle(), c.getAccent(), c.getPublished(), c.getTotal(),
                c.getDescription(),
                c.getSegments().stream().map(CampaignSegmentResponse::from).toList());
    }
}
