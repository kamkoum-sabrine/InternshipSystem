package com.example.Back.Auth.Models;

import com.example.Back.enums.Filiere;
import com.example.Back.enums.Formation;
import com.example.Back.enums.Niveau;
import com.example.Back.enums.Sexe;
import jakarta.persistence.*;
import jakarta.validation.constraints.Null;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nom;
    private String prenom;
    @Column(unique = true)
    private String email;
    private Integer cin;
    @Column(nullable = true)
    private Filiere filiere;
    @Column(nullable = true)
    private Niveau niveau ;
    private String password;
    @Column(nullable = true)
    private String adresse;
    @Column(nullable = true)
    private String option;
    @Column(nullable = true)
    private String fax;
    @Column(nullable = true)
    private Sexe sexe;
    @Column(nullable = true)
    private String lieuNaissance;
    @Column(nullable = true)
    private String tel;
    @Column(nullable = true)
    private Formation formation;
    @Column(nullable = true)
    private LocalDate dateDeNaissance;
    @Lob
    @Column(name = "photo", columnDefinition = "LONGTEXT",nullable = true)
    private String photo;
    @ManyToOne
    @JoinColumn(name = "role_id", nullable = false)
    private Role role;

    @Column(nullable = false)
    private Boolean active = true;
    
    @Column(nullable = true)
    private String departement;
    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    public String getNom() {
        return nom;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", nom='" + nom + '\'' +
                ", prenom='" + prenom + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", role=" + role +
                ", active=" + active +
                ", createdAt=" + createdAt +
                '}';
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPrenom() {
        return prenom;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Integer getCin() {
        return cin;
    }

    public Filiere getFiliere() {
        return filiere;
    }

    public Niveau getNiveau() {
        return niveau;
    }

    public void setCin(Integer cin) {
        this.cin = cin;
    }

    public void setFiliere(Filiere filiere) {
        this.filiere = filiere;
    }

    public void setNiveau(Niveau niveau) {
        this.niveau = niveau;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public Boolean getActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public Sexe getSexe() {
        return sexe;
    }

    public void setSexe(Sexe sexe) {
        this.sexe = sexe;
    }

    public Formation getFormation() {
        return formation;
    }

    public void setFormation(Formation formation) {
        this.formation = formation;
    }

    public LocalDate getDateDeNaissance() {
        return dateDeNaissance;
    }

    public void setDateDeNaissance(LocalDate dateDeNaissance) {
        this.dateDeNaissance = dateDeNaissance;
    }

    public String getPhoto() {
        return photo;
    }

    public void setPhoto(String photo) {
        this.photo = photo;
    }

}
