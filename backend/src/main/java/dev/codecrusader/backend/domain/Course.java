package dev.codecrusader.backend.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "course")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String code;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String category;

    @Column(nullable = false)
    private String color;

    @Column(nullable = false)
    private Integer modules;

    @Column(nullable = false)
    private Integer progress;

    @Column(name = "progress_label", nullable = false)
    private String progressLabel;

    @Column(name = "progress_color", nullable = false)
    private String progressColor;

    @Column(name = "cta_label", nullable = false)
    private String ctaLabel;

    @Column(name = "cta_href", nullable = false)
    private String ctaHref;

    /** "lang" or "fw" — matches the frontend course filter tabs. */
    @Column(nullable = false)
    private String type;

    @Column(nullable = false)
    private boolean completed;
}
