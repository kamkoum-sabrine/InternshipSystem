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

    private Integer valideeService; // 0 : en attente , 1: validée , -1 : non validée
    private Integer valideeDirectionEnicar;// 0 : en attente , 1: validée , -1 : non validée
    private Integer valideeDirection;// 0 : en attente , 1: validée , -1 : non validée
    private Integer valideeComite;// 0 : en attente , 1: validée , -1 : non validée
    private Integer valideeChefDepartement;// 0 : en attente , 1: validée , -1 : non validée

    private Integer annulee; // par defaut -2 : non encore annulé, 0 : demande d'annulation en attente , 1: validée , -1 : non validée  (en attente et si preuve annulation <> null)
    @Column(nullable = true)
    private String preuveAnnulationNom;
    @Column(nullable = true)
    private String preuveAnnulationChemin;

    @Column(nullable = true)
    private String lettreAffectationNom;
    @Column(nullable = true)

    private String lettreAffectationChemin;

    @Column(nullable = true)
    private String remarquesService;

    @Column(nullable = true)
    private String remarquesDirection;

}