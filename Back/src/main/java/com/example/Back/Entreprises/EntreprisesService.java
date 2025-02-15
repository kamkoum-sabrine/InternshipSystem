package com.example.Back.Entreprises;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class EntreprisesService {
private final EntreprisesRepository entreprisesRepository;
    @Autowired
    public EntreprisesService(EntreprisesRepository entreprisesRepository) {
        this.entreprisesRepository = entreprisesRepository;
    }

    public void ajouterEntreprise(Entreprise entreprise) {
        Optional<Entreprise> concernedEntreprise=this.entreprisesRepository.findEntrepriseByEmail(entreprise.getEmail());
        if(concernedEntreprise.isPresent()) {
            throw new IllegalStateException("Cette entreprise existe déja");
        }
        entreprisesRepository.save(entreprise);
    }
}
