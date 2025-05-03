package com.example.Back.Conventions.Repositories;

import com.example.Back.Auth.Models.User;
import com.example.Back.Conventions.Models.ConventionStageEte;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ConventionStageEteRepository extends JpaRepository<ConventionStageEte, Long> {
    List<ConventionStageEte> findByEtudiant(User etudiant);
    @Query("SELECT c FROM ConventionStageEte c WHERE c.annulee = 0 AND c.preuveAnnulationNom IS NOT NULL AND c.preuveAnnulationChemin IS NOT NULL ")
    List<ConventionStageEte> findConventionsAvecPreuveMaisNonAnnulees();

    List<ConventionStageEte> findByValideeComiteChefDepartement(Integer status);
}
