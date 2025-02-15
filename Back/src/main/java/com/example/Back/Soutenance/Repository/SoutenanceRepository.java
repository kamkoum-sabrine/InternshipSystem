package com.example.Back.Soutenance.Repository;

import com.example.Back.Soutenance.Model.Soutenance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface SoutenanceRepository extends JpaRepository<Soutenance,Long> {

    Optional<Soutenance> findSoutenanceByEtudiantId(Long etudiantId);
    Optional<Soutenance> findSoutenanceByDate(LocalDate date) ;

    @Query("SELECT s FROM Soutenance s " +
            "WHERE (:etudiantId IS NULL OR s.etudiantId = :etudiantId) " +
            "AND (:encadrantId IS NULL OR s.encadrantId = :encadrantId) " +
            "AND (:date IS NULL OR s.date = :date)")
    List<Soutenance> rechercherSoutenances(@Param("etudiantId") Long etudiantId,
                                           @Param("encadrantId") Long encadrantId,
                                           @Param("date") LocalDate date);}
