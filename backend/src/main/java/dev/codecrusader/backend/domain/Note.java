package dev.codecrusader.backend.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "note")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Note {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(name = "campaign_tag", nullable = false)
    private String campaignTag;

    @Column(name = "level_tag", nullable = false)
    private String levelTag;

    @Column(nullable = false)
    private String accent;

    @Column(nullable = false, length = 2000)
    private String description;

    @Column(nullable = false)
    private Integer pages;

    @Column(name = "order_index", nullable = false)
    private Integer orderIndex;
}
