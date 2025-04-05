package com.example.Back.Soutenance.Repository;

import com.example.Back.Soutenance.Model.Enseignant;
import com.example.Back.Soutenance.Model.Soutenance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface SoutenanceRepository extends JpaRepository<Soutenance,Long> {

    Optional<Soutenance> findSoutenanceByEtudiantId(Long etudiantId);

    Optional<Soutenance> findSoutenanceByDate(LocalDate date);

    Optional<Soutenance> findSoutenanceByEncadrant(Enseignant encadrant) ;

    Soutenance findSoutenanceById(Long id);

    @Query("SELECT s FROM Soutenance s " +
            "WHERE :enseignant MEMBER OF s.jury")
    Optional<Soutenance> findSoutenanceByJuryExists(@Param("enseignant") Enseignant enseignant);




    @Query("SELECT s FROM Soutenance s " +
            "WHERE (:etudiantId IS NULL OR s.etudiant.id = :etudiantId) " +
            "AND (:encadrantId IS NULL OR s.encadrant.id = :encadrantId) " +
            "AND (:date IS NULL OR s.date = :date) " +
            "AND (:heure IS NULL OR s.heure = :heure) " +
            "AND (:salle IS NULL OR s.salle = :salle)")
    List<Soutenance> rechercherSoutenances(@Param("etudiantId") Long etudiantId,
                                           @Param("encadrantId") Long encadrantId,
                                           @Param("date") LocalDate date,
                                           @Param("heure") LocalTime heure,
                                           @Param("salle") Integer salle);

    @Query("SELECT s FROM Soutenance s " +
            "WHERE s.date = :date " +
            "AND s.heure = :heure " +
            "AND s.id != COALESCE(:excludeId, -1) " + // Exclure une soutenance existante (pour l'update)
            "AND (" +
            "   s.etudiant.id = :etudiantId OR " +
            "   s.encadrant.id = :encadrantId OR " +
            "   EXISTS (SELECT 1 FROM s.jury j WHERE j.id IN :juryIds) OR " +
            "   s.salle = :salle" +
            ")")
    List<Soutenance> findConflicts(
            @Param("date") LocalDate date,
            @Param("heure") LocalTime heure,
            @Param("etudiantId") Long etudiantId,
            @Param("encadrantId") Long encadrantId,
            @Param("juryIds") List<Long> juryIds,
            @Param("salle") Integer salle,
            @Param("excludeId") Long excludeId
    );

}