package dev.codecrusader.backend.repository;

import dev.codecrusader.backend.domain.ContactMessage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContactMessageRepository extends JpaRepository<ContactMessage, Long> {
}
