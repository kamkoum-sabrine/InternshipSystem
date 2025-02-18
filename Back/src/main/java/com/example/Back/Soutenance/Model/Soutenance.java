package com.example.Back.Soutenance.Model;

import com.example.Back.Soutenance.Repository.EnseignantRepository;
import jakarta.persistence.*;
import org.antlr.v4.runtime.misc.NotNull;

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

    @ManyToOne
    @JoinColumn(name = "encadrant_id")
    private Enseignant encadrant;

    @ManyToMany
    @JoinTable(
            name = "soutenance_jury",
            joinColumns = @JoinColumn(name = "soutenance_id"),
            inverseJoinColumns = @JoinColumn(name = "enseignant_id")
    )
    private List<Enseignant> jury;

    private String sujet;




    public Soutenance() {
    }

    public Soutenance(LocalDate date, int salle, LocalTime heure, Long etudiantId, Enseignant encadrant ,List<Enseignant> jury, String sujet) {
        this.date = date;
        this.salle = salle;
        this.heure = heure;
        this.etudiantId = etudiantId;
        this.encadrant =  encadrant;
        this.jury = jury;
        this.sujet = sujet;
    }

    public Enseignant getEncadrant() {
        return encadrant;
    }

    public void setEncadrant(Enseignant encadrant) {
        this.encadrant = encadrant;
    }

    public List<Enseignant> getJury() {
        return jury;
    }

    public void setJury(List<Enseignant> jury) {
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
                ", encadrant=" + encadrant +
                ", jury=" + jury +
                ", sujet='" + sujet + '\'' +
                '}';
    }
}
