package dev.codecrusader.backend.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "campaign")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Campaign {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String number;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String accent;

    @Column(nullable = false)
    private Integer published;

    @Column(nullable = false)
    private Integer total;

    @Column(nullable = false, length = 2000)
    private String description;

    @Column(name = "order_index", nullable = false)
    private Integer orderIndex;

    @Builder.Default
    @OneToMany(mappedBy = "campaign", cascade = CascadeType.ALL, orphanRemoval = true)
    @OrderBy("orderIndex ASC")
    private List<CampaignSegment> segments = new ArrayList<>();
}
