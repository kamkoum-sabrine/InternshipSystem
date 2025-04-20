package com.example.Back.Livrables.Models;

import com.example.Back.Auth.Models.User;
import com.example.Back.enums.EtatLivrable;
import com.example.Back.enums.TypeLivrable;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.Date;


@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
public class Livrable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "etudiant", nullable = false)
    private User etudiant;

    private String titre;
    private TypeLivrable type;


    private LocalDate dateDepot;
    private String fichierPDFNom;
    private String fichierPDFChemin;

    private EtatLivrable etat ;
}
