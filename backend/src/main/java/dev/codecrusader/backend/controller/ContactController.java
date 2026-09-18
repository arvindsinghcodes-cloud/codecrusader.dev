package dev.codecrusader.backend.controller;

import dev.codecrusader.backend.dto.contact.ContactRequest;
import dev.codecrusader.backend.dto.contact.ContactResponse;
import dev.codecrusader.backend.service.ContactService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/contact")
@RequiredArgsConstructor
public class ContactController {

    private final ContactService contactService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ContactResponse submit(@Valid @RequestBody ContactRequest request) {
        return contactService.submit(request);
    }
}
