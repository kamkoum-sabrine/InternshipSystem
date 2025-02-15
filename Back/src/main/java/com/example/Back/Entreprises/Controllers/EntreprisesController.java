package com.example.Back.Entreprises.Controllers;

import com.example.Back.Entreprises.Models.Entreprise;
import com.example.Back.Entreprises.Services.EntreprisesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/entreprises")

public class EntreprisesController {
    private final EntreprisesService entreprisesService;
   @Autowired
    public EntreprisesController(EntreprisesService entreprisesService) {
        this.entreprisesService = entreprisesService;
    }
    @PostMapping
    public void createEntreprise(@RequestBody Entreprise entreprise) {
       this.entreprisesService.ajouterEntreprise(entreprise);
    }
    @GetMapping
    public List<Entreprise> getAllEntreprises() {
       return this.entreprisesService.getAllEntreprises();
    }
}

