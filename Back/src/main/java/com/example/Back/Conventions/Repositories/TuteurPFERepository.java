package com.example.Back.Conventions.Repositories;

import com.example.Back.Conventions.Models.TuteurPFE;
import com.example.Back.Entreprises.Models.Entreprise;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TuteurPFERepository  extends JpaRepository<TuteurPFE, Long> {
    Optional<TuteurPFE> findByNomAndPrenomAndEmail(String nom, String prenom, String email);
    Optional<TuteurPFE> findByEmail(String email);

}
