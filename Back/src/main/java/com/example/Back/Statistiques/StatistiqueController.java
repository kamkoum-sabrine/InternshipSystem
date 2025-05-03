package com.example.Back.Statistiques;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/statistiques")
public class StatistiqueController {

    @Autowired
    private StatistiqueService statistiqueService;

    @GetMapping("/roles")
    public ResponseEntity<Map<String, Long>> getUserCountByRole() {
        return ResponseEntity.ok(statistiqueService.getUserCountByRole());
    }

    @GetMapping("/etudiants")
    public ResponseEntity<List<Map<String, Object>>> getStudentsDistribution() {
        return ResponseEntity.ok(statistiqueService.getStudentsDistribution());
    }

    @GetMapping("/activation")
    public ResponseEntity<Map<String, Long>> getActivationStats() {
        return ResponseEntity.ok(statistiqueService.getAccountActivationStats());
    }

    @GetMapping("/students-distribution")
    public ResponseEntity<Map<String, Object>> getStudentDistribution() {
        return ResponseEntity.ok(statistiqueService.getStudentDistribution());
    }
}
