package com.example.Back.Dealines.Service;

import com.example.Back.Dealines.Model.Deadlines;
import com.example.Back.Dealines.Repository.DeadlinesRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DeadlinesService {

    private final DeadlinesRepository deadlinesRepository;

    @Autowired
    public DeadlinesService(DeadlinesRepository deadlinesRepository) {
        this.deadlinesRepository = deadlinesRepository;
    }

    public List<Deadlines> getDeadlines() {
        return deadlinesRepository.findAll();
    }

    public Deadlines getDeadlinesById(Long id) {
        return deadlinesRepository.findById(id)
                .orElseThrow(() -> new IllegalStateException("Les deadlines avec l'id " + id + " n'existent pas"));
    }

    public Deadlines addDeadlines(Deadlines deadlines) {
        return deadlinesRepository.save(deadlines);
    }

    public void deleteDeadlines(Long id) {
        if (!deadlinesRepository.existsById(id)) {
            throw new IllegalStateException("Deadline avec l'id " + id + " n'existe pas");
        }
        deadlinesRepository.deleteById(id);
    }

    @Transactional
    public Deadlines editDeadlines(Long id, Deadlines newDeadlines) {
        Deadlines existing = deadlinesRepository.findById(id)
                .orElseThrow(() -> new IllegalStateException("Deadline avec l'id " + id + " n'existe pas"));

        existing.setDeadlineConvention(newDeadlines.getDeadlineConvention());
        existing.setDeadlineAttestation(newDeadlines.getDeadlineAttestation());
        existing.setDeadlineLivrable(newDeadlines.getDeadlineLivrable());

        return existing;
    }
}
