package com.example.Back.Entreprises.Repositories;

import com.example.Back.Entreprises.Models.Entreprise;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface EntreprisesRepository extends JpaRepository<Entreprise, Long> {
    Optional<Entreprise> findByEmail(String email);
    Optional<Entreprise> findByNom(String nom);
    boolean existsByNomAndAdresse(String nom, String adresse); // Ajout de cette méthode
    boolean existsByTelephone(Long telephone);
    boolean existsById(Long id);
    boolean existsByEmailIgnoreCaseAndIdNot(String email, Long id);


    // Vérifie si un email existe (insensible à la casse)
    boolean existsByEmailIgnoreCase(String email);
    boolean existsByEmail(String email);
}
