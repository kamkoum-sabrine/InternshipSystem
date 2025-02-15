package com.example.Back.Entreprises;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface EntreprisesRepository extends JpaRepository<Entreprise, Long> {
    Optional<Entreprise> findByEmail(String email);
    Optional<Entreprise> findByNom(String nom);

    boolean existsByEmail(String email);
    boolean existsByNom(String nom);
    boolean existsByNomAndAdresse(String nom, String adresse); // Ajout de cette méthode

    void deleteByEmail(String email);
    void deleteByNom(String nom);
}
