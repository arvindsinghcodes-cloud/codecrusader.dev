package dev.codecrusader.backend.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "campaign_segment")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CampaignSegment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "campaign_id", nullable = false)
    private Campaign campaign;

    /** Two-digit display number, e.g. "01". */
    @Column(nullable = false)
    private String n;

    @Column(nullable = false)
    private String title;

    /** published | in-progress | upcoming */
    @Column(nullable = false)
    private String status;

    @Column(name = "order_index", nullable = false)
    private Integer orderIndex;
}
