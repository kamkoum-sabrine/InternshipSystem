package com.example.Back.Entreprises;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface EntreprisesRepository extends JpaRepository<Entreprise, Long> {
    Optional<Entreprise> findEntrepriseByEmail(String email);
}
