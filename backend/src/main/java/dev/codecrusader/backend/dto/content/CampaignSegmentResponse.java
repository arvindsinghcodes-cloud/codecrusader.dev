package dev.codecrusader.backend.dto.content;

import dev.codecrusader.backend.domain.CampaignSegment;

public record CampaignSegmentResponse(String n, String title, String status) {
    public static CampaignSegmentResponse from(CampaignSegment s) {
        return new CampaignSegmentResponse(s.getN(), s.getTitle(), s.getStatus());
    }
}
