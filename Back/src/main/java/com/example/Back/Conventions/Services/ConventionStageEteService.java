package com.example.Back.Conventions.Services;

import com.example.Back.Auth.Models.User;
import com.example.Back.Auth.Repositories.RoleRepository;
import com.example.Back.Auth.Repositories.UserRepository;
import com.example.Back.Conventions.Models.ConventionStageEte;
import com.example.Back.Conventions.Repositories.ConventionStageEteRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ConventionStageEteService {

    private final ConventionStageEteRepository conventionStageEteRepository;

    public ConventionStageEteService(ConventionStageEteRepository conventionStageEteRepository ) {
        this.conventionStageEteRepository = conventionStageEteRepository;
    }

    public void saveConvetionStageEte(ConventionStageEte conventionStageEte) {
        conventionStageEteRepository.save(conventionStageEte);
    }
    public List<ConventionStageEte> getConventionsAvecPreuveMaisNonAnnulees() {
        return conventionStageEteRepository.findConventionsAvecPreuveMaisNonAnnulees();
    }
}
