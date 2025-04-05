package com.example.Back.Entreprises.Models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@AllArgsConstructor
@Getter
@Setter
@ToString
@Entity
@Table(name = "entreprises")

public class Entreprise {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String nom;
    @Column(nullable = false)
    private String adresse;
    @Column(nullable = false )
    private String email;
    @Column(nullable = false , unique = true)
    private Long telephone;

    @Column(nullable = false , unique = true)
    private String representePar;

    public Entreprise() {

    }


}
