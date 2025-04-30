package com.example.Back.Attestation.Repositories;

import com.example.Back.Attestation.Model.Attestation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AttestationRepository extends JpaRepository<Attestation, Long> {
}
