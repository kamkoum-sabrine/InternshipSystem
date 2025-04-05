package com.example.Back.Auth.Models;

import jakarta.persistence.Column;

import java.time.LocalDate;
import java.util.Date;

public class UserDTO {
    private String email;
    private String nom;
    private String prenom;
    private String password;
    private String role;
    private Integer cin;
    private String filiere;
    private String niveau;
    private String adresse;
    private String option;
    private String fax;
    private String sexe;
    private String lieuNaissance;
    private LocalDate dateNaissance;
    private String formation;
    private String departement;

    public String getFormation() {
        return formation;
    }
    public void setFormation(String formation) {
        this.formation = formation;
    }

    public LocalDate getDateNaissance() {
        return dateNaissance;
    }

    public void setDateNaissance(LocalDate dateNaissance) {
        this.dateNaissance = dateNaissance;
    }

    public void setAdresse(String adresse) {
        this.adresse = adresse;
    }

    public void setOption(String option) {
        this.option = option;
    }

    public void setFax(String fax) {
        this.fax = fax;
    }

    public void setSexe(String sexe) {
        this.sexe = sexe;
    }

    public void setLieuNaissance(String lieuNaissance) {
        this.lieuNaissance = lieuNaissance;
    }

    public String getAdresse() {
        return adresse;
    }

    public String getOption() {
        return option;
    }

    public String getFax() {
        return fax;
    }

    public String getSexe() {
        return sexe;
    }

    public String getLieuNaissance() {
        return lieuNaissance;
    }

    // Getters et setters obligatoires
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getPrenom() {
        return prenom;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public Integer getCin() {
        return cin;
    }
    public void setCin(Integer cin) {
        this.cin = cin;
    }
    public String getFiliere() {
        return filiere;
    }
    public void setFiliere(String filiere) {
        this.filiere = filiere;
    }
    public String getNiveau() {
        return niveau;
    }
    public void setNiveau(String niveau) {
        this.niveau = niveau;
    }
}
