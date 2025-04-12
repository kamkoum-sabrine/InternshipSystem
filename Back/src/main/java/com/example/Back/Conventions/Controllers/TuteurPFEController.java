package com.example.Back.Conventions.Controllers;

import com.example.Back.Conventions.Models.TuteurPFE;
import com.example.Back.Conventions.Services.TuteurPFEService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/tuteurPFE")
public class TuteurPFEController {
    private final TuteurPFEService tuteurPFEService;

    @Autowired
    public TuteurPFEController(TuteurPFEService tuteurPFEService) {
        this.tuteurPFEService = tuteurPFEService;
    }

    @PostMapping
    public ResponseEntity<TuteurPFE> createTuteur(@RequestBody TuteurPFE tuteurPFE) {
        TuteurPFE savedTuteur = this.tuteurPFEService.saveTuteurPFE(tuteurPFE);
        return ResponseEntity.ok(savedTuteur);
    }



}
