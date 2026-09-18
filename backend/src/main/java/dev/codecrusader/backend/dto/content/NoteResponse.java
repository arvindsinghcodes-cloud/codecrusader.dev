package dev.codecrusader.backend.dto.content;

import dev.codecrusader.backend.domain.Note;

public record NoteResponse(
        String title, String campaignTag, String levelTag, String accent, String description, int pages
) {
    public static NoteResponse from(Note n) {
        return new NoteResponse(n.getTitle(), n.getCampaignTag(), n.getLevelTag(), n.getAccent(), n.getDescription(), n.getPages());
    }
}
