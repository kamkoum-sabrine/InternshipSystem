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
public class TuteurPFE {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nom;
    private String prenom;
    @Column(nullable = true)
    private Integer telephone;
    @Column(nullable = true)
    private String fonction;
    @Column(nullable = true)
    private String grade;
    @Column(nullable = true)
    private Integer fax;
    private String email;
    @Column(nullable = true)
    private String sitePerso;
    @ManyToOne
    @JoinColumn(name = "entreprise", nullable = false)
    private Entreprise entreprise;
}
