package com.example.Back.Statistiques;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ConventionStatsDTO {
    // Statistiques générales
    private long totalConventions;
    private long conventionsSignees;
    private long conventionsEnAttente;
    private long conventionsRefusees;

    // Répartition par type
    private long stageEteCount;
    private long stagePFECount;
    private long stageOuvrierCount;

    // Taux de validation
    private double tauxValidationService;
    private double tauxValidationDirection;
    private double tauxValidationChefDepartement;
    private double tauxValidationComite;

    // Durée moyenne
    private double dureeMoyenneEte;
    private double dureeMoyennePFE;
}