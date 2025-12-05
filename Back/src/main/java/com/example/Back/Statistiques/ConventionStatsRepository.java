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

    @Query(value = "SELECT AVG(DATEDIFF(date_fin, date_debut)) FROM convention_stage_ete", nativeQuery = true)
    Double avgDureeStageEte();


    @Query("SELECT COUNT(c) FROM ConventionStageEte c WHERE c.valideeService = 1")
    long countStageEteValideesService();

    @Query("SELECT COUNT(c) FROM ConventionStageEte c WHERE c.valideeDirectionEnicar = 1")
    long countStageEteValideesDirectionEnicar();


    @Query("SELECT COUNT(c) FROM ConventionStageEte c WHERE c.valideeDirectionEnicar = 0 ")
    long countStageEteEnAttenteDirection();

    @Query("SELECT COUNT(c) FROM ConventionStageEte c WHERE c.valideeDirectionEnicar = -1 ")
    long countStageEteRefuseesDirection();


    @Query("SELECT COUNT(c) FROM ConventionStageEte c WHERE c.valideeDirectionEnicar = 1")
    long countStageEteValideesServiceDirection();



    @Query("SELECT COUNT(c) FROM ConventionStageEte c WHERE c.valideeComiteChefDepartement = 1")
    long countStageEteValideesComiteChef();


    @Query("SELECT COUNT(c) FROM ConventionStageEte c WHERE c.valideeComiteChefDepartement = 0 ")
    long countStageEteEnAttenteComiteChef();

    @Query("SELECT COUNT(c) FROM ConventionStageEte c WHERE c.valideeComiteChefDepartement = -1 ")
    long countStageEteRefuseesComiteChef();


    @Query("SELECT COUNT(c) FROM ConventionStageEte c WHERE c.valideeComiteChefDepartement = 1")
    long countStageEteValideesServiceComiteChef();


}