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
public class ConventionStageEte {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "etudiant", nullable = false)
    private User etudiant;

    /*private String etablissement;
    private String adresse;
    private String representePar;
    private String tuteurStage;
    private String email;
    private String telephone;*/

    @ManyToOne
    @JoinColumn(name = "entreprise", nullable = false)
    private Entreprise entreprise;
    private String tuteurStage;
    private Date dateDebut;
    private Date dateFin;
    private Date dateDepot;
    private String fichierPDFNom;
    private String fichierPDFChemin;

    private Integer valideeService;
    private Integer valideeDirection;
    private Integer annulee;
    @Column(nullable = true)
    private String preuveAnnulationNom;
    @Column(nullable = true)
    private String preuveAnnulationChemin;
}
