package com.example.Back.Conventions.Controllers;

import com.example.Back.Conventions.Models.TuteurPFE;
import com.example.Back.Conventions.Models.TuteurPFEDTO;
import com.example.Back.Conventions.Services.TuteurPFEService;

import com.example.Back.Entreprises.Models.Entreprise;
import com.example.Back.Entreprises.Repositories.EntreprisesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tuteurPFE")
public class TuteurPFEController {
    private final TuteurPFEService tuteurPFEService;
    private final EntreprisesRepository entreprisesRepository;

    @Autowired
    public TuteurPFEController(TuteurPFEService tuteurPFEService, EntreprisesRepository entreprisesRepository) {
        this.tuteurPFEService = tuteurPFEService;
        this.entreprisesRepository = entreprisesRepository;
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




}
