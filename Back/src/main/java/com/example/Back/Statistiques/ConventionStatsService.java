package com.example.Back.Statistiques;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ConventionStatsService {

    @Autowired
    private ConventionStatsRepository eteStatsRepository;

    @Autowired
    private ConventionPFEStatsRepository pfeStatsRepository;

    public ConventionStatsDTO getConventionStats() {
        ConventionStatsDTO stats = new ConventionStatsDTO();

        // Calcul des totaux
        long totalEte = eteStatsRepository.countAllStageEte();
        long totalPFE = pfeStatsRepository.countAllStagePFE();
        long totalOuvrier = 0; // À adapter si vous avez ce type

        stats.setTotalConventions(totalEte + totalPFE + totalOuvrier);
        stats.setConventionsSignees(
                eteStatsRepository.countStageEteSignees() +
                        pfeStatsRepository.countStagePFESignees()
        );
        stats.setConventionsSignees(
                eteStatsRepository.countStageEteSignees() +
                        pfeStatsRepository.countStagePFESignees()
        );
        stats.setConventionsSigneesDirection(
                eteStatsRepository.countStageEteValideesServiceDirection() +
                        pfeStatsRepository.countStagePFESignees()
        );
        stats.setConventionsSigneesComiteChef(
                eteStatsRepository.countStageEteValideesComiteChef() +
                        pfeStatsRepository.countStagePFEValideesComiteChef()
        );
        stats.setConventionsEnAttente(
                eteStatsRepository.countStageEteEnAttente() +
                        pfeStatsRepository.countStagePFEEnAttente()
        );
        stats.setConventionsEnAttenteDirection(
                eteStatsRepository.countStageEteEnAttenteDirection() +
                        pfeStatsRepository.countStagePFEEnAttente()
        );
        stats.setConventionsEnAttenteComiteChef(
                eteStatsRepository.countStageEteEnAttenteComiteChef() +
                        pfeStatsRepository.countStagePFEEnAttenteComiteChef()
        );
        stats.setConventionsRefusees(
                eteStatsRepository.countStageEteRefusees() +
                        pfeStatsRepository.countStagePFERefusees()
        );

        stats.setConventionsRefuseesDirection(
                eteStatsRepository.countStageEteRefuseesDirection() +
                        pfeStatsRepository.countStagePFERefusees()
        );

        stats.setConventionsRefuseesComiteChef(
                eteStatsRepository.countStageEteRefuseesComiteChef() +
                        pfeStatsRepository.countStagePFERefuseesComiteChef()
        );

        // Répartition par type
        stats.setStageEteCount(totalEte);
        stats.setStagePFECount(totalPFE);
        stats.setStageOuvrierCount(totalOuvrier);

        // Taux de validation
        long totalValideesService = eteStatsRepository.countStageEteValideesService() +
                pfeStatsRepository.countStagePFEValideesService();
        stats.setTauxValidationService(
                stats.getTotalConventions() > 0 ?
                        (totalValideesService * 100.0 / stats.getTotalConventions()) : 0
        );



        long totalValideesDirectionEnicar = eteStatsRepository.countStageEteValideesDirectionEnicar() +
                pfeStatsRepository.countStagePFEValideesService();
        stats.setTauxValidationDirection(
                stats.getTotalConventions() > 0 ?
                        (totalValideesDirectionEnicar * 100.0 / stats.getTotalConventions()) : 0
        );

        long totalValideesComiteChef = eteStatsRepository.countStageEteValideesComiteChef() +
                pfeStatsRepository.countStagePFEValideesComiteChef();
        stats.setTauxValidationComiteChef(
                stats.getTotalConventions() > 0 ?
                        (totalValideesComiteChef * 100.0 / stats.getTotalConventions()) : 0
        );



        return stats;
    }
}