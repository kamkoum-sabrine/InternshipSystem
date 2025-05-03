package com.example.Back.Statistiques;


import com.example.Back.Conventions.Models.ConventionStageEte;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ConventionStatsRepository extends JpaRepository<ConventionStageEte, Long> {

    @Query("SELECT COUNT(c) FROM ConventionStageEte c")
    long countAllStageEte();

    @Query("SELECT COUNT(c) FROM ConventionStageEte c WHERE c.valideeService = 1 ")
    long countStageEteSignees();

    @Query("SELECT COUNT(c) FROM ConventionStageEte c WHERE c.valideeService = 0 ")
    long countStageEteEnAttente();

    @Query("SELECT COUNT(c) FROM ConventionStageEte c WHERE c.valideeService = -1 ")
    long countStageEteRefusees();

    @Query("SELECT AVG(DATEDIFF(c.dateFin, c.dateDebut)) FROM ConventionStageEte c")
    Double avgDureeStageEte();

    @Query("SELECT COUNT(c) FROM ConventionStageEte c WHERE c.valideeService = 1")
    long countStageEteValideesService();

    @Query("SELECT COUNT(c) FROM ConventionStageEte c WHERE c.valideeDirectionEnicar = 1")
    long countStageEteValideesDirectionEnicar();

}