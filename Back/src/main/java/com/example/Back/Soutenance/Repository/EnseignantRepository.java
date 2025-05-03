    package com.example.Back.Soutenance.Repository;

    import com.example.Back.Soutenance.Model.Enseignant;
    import org.springframework.data.jpa.repository.JpaRepository;
    import org.springframework.stereotype.Repository;

    @Repository
    public interface EnseignantRepository extends JpaRepository<Enseignant, Long> {
        Enseignant findEnseignantById (Long id);

        Boolean existsByEmail (String email);

    }
