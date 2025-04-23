package com.example.Back.Conventions.Controllers;

import com.example.Back.Auth.Repositories.UserRepository;
import com.example.Back.Conventions.Models.ConventionStageEte;
import com.example.Back.Conventions.Models.ConventionStagePFE;
import com.example.Back.Conventions.Repositories.ConventionStageEteRepository;
import com.example.Back.Conventions.Repositories.ConventionStagePFERepository;
import com.example.Back.Conventions.Services.ConventionStageEteService;
import com.example.Back.Entreprises.Repositories.EntreprisesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/conventionStage")
public class ConventionDirectionEnicarController {

    private final ConventionStageEteService conventionStageEteService;
    private final ConventionStageEteRepository conventionStageEteRepository;
    private final UserRepository userRepository;
    private final EntreprisesRepository entreprisesRepository;
    private final ConventionStagePFERepository conventionStagePFERepository;

    @Autowired
    public ConventionDirectionEnicarController(ConventionStageEteService conventionStageEteService, ConventionStageEteRepository conventionRepository, UserRepository userRepository, EntreprisesRepository entreprisesRepository, ConventionStagePFERepository conventionStagePFERepository) {
        this.conventionStageEteService = conventionStageEteService;
        this.conventionStageEteRepository = conventionRepository;
        this.userRepository = userRepository;
        this.entreprisesRepository = entreprisesRepository;
        this.conventionStagePFERepository = conventionStagePFERepository;
    }

    @GetMapping("/validees-chef-departementETE")
    public List<ConventionStageEte> getConventionsValideesChefDepartementETE() {
        return conventionStageEteRepository.findByValideeChefDepartement(1);
    }
    @GetMapping("/validees-chef-departementPFE")
    public List<ConventionStagePFE> getConventionsValideesChefDepartementPFE() {
        return conventionStagePFERepository.findByValideeChefDepartement(1);
    }

}
