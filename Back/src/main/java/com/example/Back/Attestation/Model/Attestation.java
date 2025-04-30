package com.example.Back.Attestation.Model;

import com.example.Back.Auth.Models.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
public class Attestation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "etudiant", nullable = false)
    private User etudiant;

    private String nomFichier;

    private String cheminFichier;
    @Temporal(TemporalType.TIMESTAMP)
    private Date dateDepot;

    // 🔽 Méthodes explicites (optionnelles si tu veux personnaliser ou debugger)

    public void setEtudiant(User etudiant) {
        this.etudiant = etudiant;
    }

    public void setNomFichier(String nomFichier) {
        this.nomFichier = nomFichier;
    }

    public void setCheminFichier(String cheminFichier) {
        this.cheminFichier = cheminFichier;
    }

    public User getEtudiant() {
        return etudiant;
    }

    public String getNomFichier() {
        return nomFichier;
    }

    public String getCheminFichier() {
        return cheminFichier;
    }
}
