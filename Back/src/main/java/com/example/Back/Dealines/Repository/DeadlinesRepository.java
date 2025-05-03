package com.example.Back.Dealines.Repository;

import com.example.Back.Dealines.Model.Deadlines;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DeadlinesRepository extends JpaRepository<Deadlines, Long> {
    Deadlines findDeadlinesById(Long id);
}
