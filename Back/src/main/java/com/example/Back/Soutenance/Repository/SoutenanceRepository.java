package com.example.Back.Soutenance.Repository;

import com.example.Back.Soutenance.Model.Soutenance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Optional;

@Repository
public interface SoutenanceRepository extends JpaRepository<Soutenance,Long> {

    Optional<Soutenance> findSoutenanceByEtudiantId(Long etudiantId);
    Optional<Soutenance> findSoutenanceByDate(LocalDate date) ;
}
