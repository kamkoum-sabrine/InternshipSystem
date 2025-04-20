package com.example.Back.Livrables.Repository;

import com.example.Back.Auth.Models.User;
import com.example.Back.Conventions.Models.ConventionStageEte;
import com.example.Back.Livrables.Models.Livrable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface Livrablerepository extends JpaRepository<Livrable, Long> {

    List<Livrable> findByEtudiant(User etudiant);

}
