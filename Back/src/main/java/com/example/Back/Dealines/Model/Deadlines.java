package com.example.Back.Dealines.Model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table
public class Deadlines {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate deadlineConvention;
    private LocalDate deadlineAttestation;
    private LocalDate deadlineLivrable;

    public Deadlines() {}

    public Deadlines(LocalDate deadlineConvention, LocalDate deadlineAttestation, LocalDate deadlineLivrable) {
        this.deadlineConvention = deadlineConvention;
        this.deadlineAttestation = deadlineAttestation;
        this.deadlineLivrable = deadlineLivrable;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDeadlineConvention() {
        return deadlineConvention;
    }

    public void setDeadlineConvention(LocalDate deadlineConvention) {
        this.deadlineConvention = deadlineConvention;
    }

    public LocalDate getDeadlineAttestation() {
        return deadlineAttestation;
    }

    public void setDeadlineAttestation(LocalDate deadlineAttestation) {
        this.deadlineAttestation = deadlineAttestation;
    }

    public LocalDate getDeadlineLivrable() {
        return deadlineLivrable;
    }

    public void setDeadlineLivrable(LocalDate deadlineLivrable) {
        this.deadlineLivrable = deadlineLivrable;
    }

    @Override
    public String toString() {
        return "Deadlines{" +
                "id=" + id +
                ", deadlineConvention=" + deadlineConvention +
                ", deadlineAttestation=" + deadlineAttestation +
                ", deadlineLivrable=" + deadlineLivrable +
                '}';
    }
}
