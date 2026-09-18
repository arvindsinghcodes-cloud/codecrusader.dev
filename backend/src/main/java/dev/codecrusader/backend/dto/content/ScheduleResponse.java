package dev.codecrusader.backend.dto.content;

import dev.codecrusader.backend.domain.ScheduleSlot;

public record ScheduleResponse(
        String day, String month, String title, String time,
        String campaign, String campaignColor, String status, String statusStyle
) {
    public static ScheduleResponse from(ScheduleSlot s) {
        return new ScheduleResponse(
                s.getDay(), s.getMonth(), s.getTitle(), s.getTime(),
                s.getCampaign(), s.getCampaignColor(), s.getStatus(), s.getStatusStyle());
    }
}
