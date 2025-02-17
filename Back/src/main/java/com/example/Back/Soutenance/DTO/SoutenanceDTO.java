package com.example.Back.Soutenance.DTO;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

public class SoutenanceDTO {

    private LocalDate date;

    private LocalTime heure;

    private int salle;

    private Long etudiantId;

    private Long encadrantId;

    private List<Long> juryIds;

    private String sujet;

    // Getters and Setters
    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public LocalTime getHeure() {
        return heure;
    }

    public void setHeure(LocalTime heure) {
        this.heure = heure;
    }

    public int getSalle() {
        return salle;
    }

    public void setSalle(int salle) {
        this.salle = salle;
    }

    public Long getEtudiantId() {
        return etudiantId;
    }

    public void setEtudiantId(Long etudiantId) {
        this.etudiantId = etudiantId;
    }

    public Long getEncadrantId() {
        return encadrantId;
    }

    public void setEncadrantId(Long encadrantId) {
        this.encadrantId = encadrantId;
    }

    public List<Long> getJuryIds() {
        return juryIds;
    }

    public void setJuryIds(List<Long> juryIds) {
        this.juryIds = juryIds;
    }

    public String getSujet() {
        return sujet;
    }

    public void setSujet(String sujet) {
        this.sujet = sujet;
    }
}