package com.example.Back.Conventions.Models;

import com.example.Back.Auth.Models.User;
import com.example.Back.Entreprises.Models.Entreprise;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
public class ConventionStagePFE {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "etudiant", nullable = false)
    private User etudiant;
    @ManyToOne
    @JoinColumn(name = "entreprise", nullable = false)
    private Entreprise entreprise;
    @ManyToOne
    @JoinColumn(name = "tuteurPFE", nullable = false)
    private TuteurPFE tuteurPFE;
    private String Lieu; //Tunisie ou à l'étranger
    private String cahierDeCharge;
    private String materielALaDispositionEtudiant;
    private String materielDeRealisation;

    @Column(nullable = true)
    private Boolean favorable; // equivaut à validée direction stage
    @Column(nullable = true)
    private String remarques;

    private String fichierPDFNom;
    private String fichierPDFChemin;

    private Integer valideeService; // 0 : en attente , 1: validée , -1 : non validée


}
