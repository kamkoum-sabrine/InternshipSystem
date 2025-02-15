package com.example.Back.Soutenance.Model;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Entity
public class Soutenance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long id;

    private LocalDate date;

    private LocalTime heure;

    private int salle;

    private Long etudiantId;

    private Long encadrantId;

    @ElementCollection
    private List<String> jury;

    private String sujet;




    public Soutenance() {
    }

    public Soutenance(LocalDate date, int salle, LocalTime heure, Long etudiantId, Long encadrantId,List<String> jury, String sujet) {
        this.date = date;
        this.salle = salle;
        this.heure = heure;
        this.etudiantId = etudiantId;
        this.encadrantId = encadrantId;
        this.jury = jury;
        this.sujet = sujet;
    }

    public List<String> getJury() {
        return jury;
    }

    public void setJury(List<String> jury) {
        this.jury = jury;
    }

    public Long getId() {
        return id;
    }

    public LocalDate getDate() {
        return date;
    }

    public LocalTime getHeure() {
        return heure;
    }

    public int getSalle() {
        return salle;
    }

    public Long getEtudiantId() {
        return etudiantId;
    }

    public Long getEncadrantId() {
        return encadrantId;
    }



    public String getSujet() {
        return sujet;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public void setHeure(LocalTime heure) {
        this.heure = heure;
    }

    public void setSalle(int salle) {
        this.salle = salle;
    }

    public void setEtudiantId(Long etudiantId) {
        this.etudiantId = etudiantId;
    }

    public void setEncadrantId(Long encadrantId) {
        this.encadrantId = encadrantId;
    }



    public void setSujet(String sujet) {
        this.sujet = sujet;
    }

    @Override
    public String toString() {
        return "Soutenance{" +
                "id=" + id +
                ", date=" + date +
                ", heure=" + heure +
                ", salle=" + salle +
                ", etudiantId=" + etudiantId +
                ", encadrantId=" + encadrantId +
                ", jury=" + jury +
                ", sujet='" + sujet + '\'' +
                '}';
    }
}
