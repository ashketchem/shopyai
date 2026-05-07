package com.shopyai.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "platform_data")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PlatformData {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String platformName;

    @Column(nullable = false)
    private Double price;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String productUrl;

    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> bestReviews;

    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> avgReviews;

    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> badReviews;

    @Column(nullable = false)
    private LocalDateTime scrapeDate;

    @PrePersist
    protected void onCreate() {
        scrapeDate = LocalDateTime.now();
    }
}
