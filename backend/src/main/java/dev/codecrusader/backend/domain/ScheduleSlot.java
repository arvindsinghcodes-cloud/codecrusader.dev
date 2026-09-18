package dev.codecrusader.backend.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "schedule_slot")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ScheduleSlot {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "day_label", nullable = false)
    private String day;

    @Column(name = "month_label", nullable = false)
    private String month;

    @Column(nullable = false)
    private String title;

    @Column(name = "time_label", nullable = false)
    private String time;

    @Column(nullable = false)
    private String campaign;

    @Column(name = "campaign_color", nullable = false)
    private String campaignColor;

    @Column(nullable = false)
    private String status;

    @Column(name = "status_style", nullable = false)
    private String statusStyle;

    @Column(name = "order_index", nullable = false)
    private Integer orderIndex;
}
