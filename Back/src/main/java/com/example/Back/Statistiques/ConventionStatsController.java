package com.example.Back.Statistiques;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/conventions/stats")

public class ConventionStatsController {

    @Autowired
    private ConventionStatsService statsService;

    @GetMapping
    public ConventionStatsDTO getConventionStats() {
        return statsService.getConventionStats();
    }
}