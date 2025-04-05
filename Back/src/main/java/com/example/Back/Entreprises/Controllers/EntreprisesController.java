package com.example.Back.Entreprises.Controllers;

import com.example.Back.Entreprises.Models.Entreprise;
import com.example.Back.Entreprises.Repositories.EntreprisesRepository;
import com.example.Back.Entreprises.Services.EntreprisesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/entreprises")

public class EntreprisesController {
    private final EntreprisesService entreprisesService;
   @Autowired
    public EntreprisesController(EntreprisesService entreprisesService ) {
        this.entreprisesService = entreprisesService;
    }
    @PostMapping
    public ResponseEntity<Entreprise> createEntreprise(@RequestBody Entreprise entreprise) {
       Entreprise savedEntreprise = this.entreprisesService.addEntreprise(entreprise);
       return ResponseEntity.ok(savedEntreprise);
    }

    @GetMapping
    public List<Entreprise> getAllEntreprises() {
       return this.entreprisesService.getAllEntreprises();
    }
    @DeleteMapping("/{id}")
    public void deleteEntreprise(@PathVariable Long id) {
       this.entreprisesService.deleteEntreprise(id);
    }
    @PutMapping("/{id}")
    public void updateEntreprise(@PathVariable Long id, @RequestBody Entreprise entreprise) {
        this.entreprisesService.updateEntreprise(id, entreprise);
    }

    @PostMapping("/check-existence")
    public ResponseEntity<?> checkEntrepriseExistence(
            @RequestBody Entreprise request) {

        Optional<Entreprise> existingEntreprise = entreprisesService.checkIfEntrepriseExists(
                request.getNom(),
                request.getAdresse(),
                request.getEmail()
        );

        if (existingEntreprise.isPresent()) {
            return ResponseEntity.ok().body(Map.of(
                    "exists", true,
                    "entreprise", existingEntreprise.get()
            ));
        }
        return ResponseEntity.ok(Map.of("exists", false));
    }


}

