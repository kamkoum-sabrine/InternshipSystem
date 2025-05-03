package com.example.Back.Attestation.Repositories;

import com.example.Back.Attestation.Model.Attestation;
import com.example.Back.Auth.Models.User;
import com.example.Back.Conventions.Models.ConventionStageEte;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AttestationRepository extends JpaRepository<Attestation, Long> {
    List<Attestation> findByEtudiant(User etudiant);

}
