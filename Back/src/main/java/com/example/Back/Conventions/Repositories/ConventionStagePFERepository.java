package com.example.Back.Conventions.Repositories;

import com.example.Back.Auth.Models.User;
import com.example.Back.Conventions.Models.ConventionStageEte;
import com.example.Back.Conventions.Models.ConventionStagePFE;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ConventionStagePFERepository extends JpaRepository<ConventionStagePFE, Long> {
    List<ConventionStagePFE> findByEtudiant(User etudiant);

}
