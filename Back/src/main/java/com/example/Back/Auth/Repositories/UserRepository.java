package com.example.Back.Auth.Repositories;

import java.util.List;
import java.util.Optional;

import com.example.Back.Auth.Models.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.Back.Auth.Models.User;
import org.springframework.data.jpa.repository.Query;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findUserByEmail(String email);

    Optional<User> findUserById(Long id) ;

    Boolean existsByEmailIgnoreCase(String email);
    Boolean existsByTel (String tel);

    List<User> getUsersByRole(Role role);

    Optional<User> findByEmail(String email);

    // 1. Nombre total d'utilisateurs par rôle
    @Query("SELECT u.role.nom, COUNT(u) FROM User u GROUP BY u.role.nom")
    List<Object[]> countUsersByRole();



    // 3. Taux d’activation des comptes
    @Query("SELECT u.active, COUNT(u) FROM User u GROUP BY u.active")
    List<Object[]> countActiveStatus();

    // Répartition par filière (avec comptage)
    @Query("SELECT u.filiere, COUNT(u) FROM User u WHERE u.role.nom = 'ETUDIANT' GROUP BY u.filiere")
    List<Object[]> countStudentsByFiliere();

    // Répartition par niveau (avec comptage)
    @Query("SELECT u.niveau, COUNT(u) FROM User u WHERE u.role.nom = 'ETUDIANT' GROUP BY u.niveau")
    List<Object[]> countStudentsByNiveau();

    // Répartition combinée filière/niveau
    @Query("SELECT u.filiere, u.niveau, COUNT(u) FROM User u WHERE u.role.nom = 'ETUDIANT' GROUP BY u.filiere, u.niveau")
    List<Object[]> countStudentsByFiliereAndNiveau();

}
