package com.example.Back.Statistiques;

import com.example.Back.Conventions.Models.ConventionStagePFE;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ConventionPFEStatsRepository extends JpaRepository<ConventionStagePFE, Long> {

    @Query("SELECT COUNT(c) FROM ConventionStagePFE c")
    long countAllStagePFE();

    @Query("SELECT COUNT(c) FROM ConventionStagePFE c WHERE c.valideeService = 1")
    long countStagePFESignees();

    @Query("SELECT COUNT(c) FROM ConventionStagePFE c WHERE c.valideeService = 0 ")
    long countStagePFEEnAttente();

    @Query("SELECT COUNT(c) FROM ConventionStagePFE c WHERE c.valideeService = -1 ")
    long countStagePFERefusees();



    @Query("SELECT COUNT(c) FROM ConventionStagePFE c WHERE c.valideeService = 1")
    long countStagePFEValideesService();

    // Ajoutez d'autres méthodes spécifiques à PFE si nécessaire
}