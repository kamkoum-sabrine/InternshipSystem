package com.example.Back.Conventions.Controllers;

import com.example.Back.Conventions.Models.TuteurPFE;
import com.example.Back.Conventions.Models.TuteurPFEDTO;
import com.example.Back.Conventions.Repositories.TuteurPFERepository;
import com.example.Back.Conventions.Services.TuteurPFEService;

import com.example.Back.Entreprises.Models.Entreprise;
import com.example.Back.Entreprises.Repositories.EntreprisesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/tuteurPFE")
public class TuteurPFEController {
    private final TuteurPFEService tuteurPFEService;
    private final EntreprisesRepository entreprisesRepository;
    private final TuteurPFERepository tuteurPFERepository;

    @Autowired
    public TuteurPFEController(TuteurPFEService tuteurPFEService, EntreprisesRepository entreprisesRepository, TuteurPFERepository tuteurPFERepository) {
        this.tuteurPFEService = tuteurPFEService;
        this.entreprisesRepository = entreprisesRepository;
        this.tuteurPFERepository = tuteurPFERepository;
    }

    @GetMapping
    public List<TuteurPFE> getAllTuteurPFE() {
        return this.tuteurPFEService.getAllTuteurPFEs();
    }
    @PostMapping
    public ResponseEntity<?> createTuteur(@RequestBody TuteurPFEDTO dto) {
        try {
            System.out.println("id Entreprise "+dto.getEntreprise());
            Entreprise entreprise = entreprisesRepository.findById(dto.getEntreprise())
                    .orElseThrow(() -> new RuntimeException("Entreprise non trouvée"));

            TuteurPFE tuteur = new TuteurPFE();
            tuteur.setNom(dto.getNom());
            tuteur.setPrenom(dto.getPrenom());
            tuteur.setFonction(dto.getFonction());
            tuteur.setGrade(dto.getGrade());
            tuteur.setFax(dto.getFax());
            tuteur.setTelephone(dto.getTelephone());
            tuteur.setEmail(dto.getEmail());
            tuteur.setSitePerso(dto.getSitePerso());
            tuteur.setEntreprise(entreprise);

            TuteurPFE saved = tuteurPFEService.saveTuteurPFE(tuteur);
            return ResponseEntity.ok(saved);

        } catch (Exception ex) {
            ex.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erreur lors de l'enregistrement du tuteur : " + ex.getMessage());
        }
    }


    @PostMapping("/check-existence")
    public ResponseEntity<?> checkTuteurExistence(
            @RequestBody TuteurPFE request) {
        try{
            System.out.println(request.getNom());
            System.out.println(request.getPrenom());
            System.out.println(request.getEmail());
            Optional<TuteurPFE> existingTuteurPFE = tuteurPFEService.checkIfTuteurPFEExists(
                    request.getNom(),
                    request.getPrenom(),
                    request.getEmail()
            );

            if (existingTuteurPFE.isPresent()) {
                return ResponseEntity.ok().body(Map.of(
                        "exists", true,
                        "tuteur", existingTuteurPFE.get()
                ));
            }
            return ResponseEntity.ok(Map.of("exists", false));
        }
        catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of(
                            "error", "Internal server error",
                            "message", e.getMessage(),
                            "stackTrace", getStackTraceAsString(e)
                    ));
        }

    }
    private String getStackTraceAsString(Exception e) {
        StringBuilder sb = new StringBuilder();
        for (StackTraceElement element : e.getStackTrace()) {
            sb.append(element.toString()).append("\n");
        }
        return sb.toString();
    }




}
