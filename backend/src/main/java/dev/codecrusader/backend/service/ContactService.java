package dev.codecrusader.backend.service;

import dev.codecrusader.backend.domain.ContactMessage;
import dev.codecrusader.backend.dto.contact.ContactRequest;
import dev.codecrusader.backend.dto.contact.ContactResponse;
import dev.codecrusader.backend.repository.ContactMessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ContactService {

    private final ContactMessageRepository contactMessageRepository;

    public ContactResponse submit(ContactRequest request) {
        ContactMessage saved = contactMessageRepository.save(ContactMessage.builder()
                .name(request.name())
                .email(request.email())
                .projectType(request.projectType())
                .message(request.message())
                .build());

        // TODO: notify Arvind (email/Slack webhook) once a mail provider is wired up.
        return new ContactResponse(true, saved.getId());
    }
}
