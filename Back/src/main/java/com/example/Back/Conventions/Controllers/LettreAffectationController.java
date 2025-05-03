package com.example.Back.Conventions.Controllers;


import com.example.Back.Conventions.Models.ConventionStageEte;
import com.example.Back.Conventions.Services.LettreAffectationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/conventions/lettre-affectation")
public class LettreAffectationController {

    @Autowired
    private LettreAffectationService lettreAffectationService;

    @PostMapping("/generate/{conventionId}")
    public ResponseEntity<Resource> generateLettreAffectation(@PathVariable Long conventionId) {
        ConventionStageEte convention = lettreAffectationService.generateAndStoreLettreAffectation(conventionId);

        Resource resource = lettreAffectationService.loadLettreAffectationAsResource(
                convention.getLettreAffectationChemin());

        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_PDF)
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=\"" + convention.getLettreAffectationNom() + "\"")
                .body(resource);
    }
}