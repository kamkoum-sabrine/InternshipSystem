package com.example.Back.Conventions.Services;

import com.example.Back.Conventions.Models.ConventionStagePFE;
import com.example.Back.Conventions.Repositories.ConventionStagePFERepository;
import org.springframework.stereotype.Service;

@Service
public class ConventionStagePFEService {
    private final ConventionStagePFERepository conventionStagePFERepository;

    public ConventionStagePFEService(ConventionStagePFERepository conventionStagePFERepository ) {
        this.conventionStagePFERepository = conventionStagePFERepository;
    }

    public ConventionStagePFE saveConvetionStagePFE(ConventionStagePFE conventionStagePFE) {
        conventionStagePFERepository.save(conventionStagePFE);
        return conventionStagePFE;
    }
}
