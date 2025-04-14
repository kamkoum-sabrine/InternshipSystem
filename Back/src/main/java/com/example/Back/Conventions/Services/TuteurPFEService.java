package com.example.Back.Conventions.Services;

import com.example.Back.Conventions.Models.TuteurPFE;
import com.example.Back.Conventions.Repositories.TuteurPFERepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TuteurPFEService {

    private final TuteurPFERepository tuteurPFERepository;
    @Autowired
    public TuteurPFEService(TuteurPFERepository tuteurPFERepository ) {
        this.tuteurPFERepository = tuteurPFERepository;
    }

    public TuteurPFE saveTuteurPFE(TuteurPFE tuteurPFE) {
        tuteurPFERepository.save(tuteurPFE);
        return tuteurPFE;
    }

    public Optional<TuteurPFE> checkIfTuteurPFEExists(String nom, String prenom, String email) {
        return tuteurPFERepository.findByNomAndPrenomAndEmail(nom, prenom, email);
      //  return tuteurPFERepository.findByEmail(email);
    }

    public List<TuteurPFE> getAllTuteurPFEs() {
        return this.tuteurPFERepository.findAll();
    }
}
