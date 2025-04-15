package com.example.Back.Conventions.Models;

import com.example.Back.Auth.Models.User;
import com.example.Back.Entreprises.Models.Entreprise;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

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
    @Column(length = 5000)
    private String cahierDeCharge;
    private String intituleSujet;
    private String materielALaDispositionEtudiant;
    private String materielDeRealisation;

    @Column(nullable = true)
    private Integer favorable; // 0 : en attente , 1: favorable , -1 : non favorable
    @Column(nullable = true)
    private String remarques;

    private String fichierPDFNom;
    private String fichierPDFChemin;

    //private Date dateDebut;
  //  private Date dateFin;
    private Date dateDepot;

    private Integer valideeService; // 0 : en attente , 1: validée , -1 : non validée
    private Integer annulee; // par defaut 0 (en attente et si preuve annulation <> null)
    @Column(nullable = true)
    private String preuveAnnulationNom;
    @Column(nullable = true)
    private String preuveAnnulationChemin;

}
