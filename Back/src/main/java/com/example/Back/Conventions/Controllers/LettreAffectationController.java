package com.example.Back.Conventions.Controllers;


import com.example.Back.Conventions.Models.ConventionStageEte;
import com.example.Back.Conventions.Models.ConventionStagePFE;
import com.example.Back.Conventions.Repositories.ConventionStageEteRepository;
import com.example.Back.Conventions.Services.LettreAffectationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.MalformedURLException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Optional;

@RestController
@RequestMapping("/api/conventions/lettre-affectation")
public class LettreAffectationController {

    @Autowired
    private LettreAffectationService lettreAffectationService;

    @Autowired
    private ConventionStageEteRepository conventionStageEteRepository;

    @Value("${file.upload-dir}/lettreAffectation")
    private String uploadDir;


    @PostMapping("/generate/{conventionId}")
    public ResponseEntity<Resource> generateLettreAffectation(@PathVariable Long conventionId) {
        ConventionStageEte convention = lettreAffectationService.generateAndStoreSignedLettreAffectation(conventionId);

        Resource resource = lettreAffectationService.loadLettreAffectationAsResource(
                convention.getLettreAffectationChemin());

        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_PDF)
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=\"" + convention.getLettreAffectationNom() + "\"")
                .body(resource);
    }

    @PostMapping("/generatePFE/{conventionId}")
    public ResponseEntity<Resource> generateLettreAffectationPFE(@PathVariable Long conventionId) {
        ConventionStagePFE convention = lettreAffectationService.generateAndStoreSignedLettreAffectationPFE(conventionId);

        Resource resource = lettreAffectationService.loadLettreAffectationAsResource(
                convention.getLettreAffectationChemin());

        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_PDF)
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=\"" + convention.getLettreAffectationNom() + "\"")
                .body(resource);
    }


    @GetMapping("/uploads/{fileName:.+}")

    public ResponseEntity<Resource> getFile(@PathVariable String fileName) {
        try {
            Path filePath = Paths.get(uploadDir).resolve(fileName);
            Resource resource = new UrlResource(filePath.toUri());

            if (resource.exists() || resource.isReadable()) {
                return ResponseEntity.ok()
                        .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + resource.getFilename() + "\"")
                        .contentType(MediaType.APPLICATION_PDF)
                        .body(resource);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }
        } catch (MalformedURLException e) {
            return ResponseEntity.internalServerError().body(null);
        }
    }

}