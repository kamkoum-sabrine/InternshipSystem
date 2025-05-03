package com.example.Back.Statistiques;

import com.example.Back.Auth.Repositories.UserRepository;
import com.example.Back.enums.Filiere;
import com.example.Back.enums.Niveau;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class StatistiqueService {

    @Autowired
    private UserRepository userRepository;

    public Map<String, Long> getUserCountByRole() {
        List<Object[]> results = userRepository.countUsersByRole();
        Map<String, Long> map = new HashMap<>();
        for (Object[] result : results) {
            map.put((String) result[0], (Long) result[1]);
        }
        return map;
    }

    public List<Map<String, Object>> getStudentsDistribution() {
        List<Object[]> results = userRepository.countStudentsByFiliereAndNiveau();
        List<Map<String, Object>> list = new ArrayList<>();
        for (Object[] result : results) {
            Map<String, Object> map = new HashMap<>();
            map.put("filiere", result[0]);
            map.put("niveau", result[1]);
            map.put("count", result[2]);
            list.add(map);
        }
        return list;
    }

    public Map<String, Long> getAccountActivationStats() {
        List<Object[]> results = userRepository.countActiveStatus();
        Map<String, Long> map = new HashMap<>();
        for (Object[] result : results) {
            Boolean isActive = (Boolean) result[0];
            map.put(isActive ? "activés" : "désactivés", (Long) result[1]);
        }
        return map;
    }

    public Map<String, Object> getStudentDistribution() {
        Map<String, Object> stats = new HashMap<>();

        // 1. Par filière
        List<Object[]> byFiliere = userRepository.countStudentsByFiliere();
        Map<String, Long> filiereStats = byFiliere.stream()
                .filter(arr -> arr[0] != null)
                .collect(Collectors.toMap(
                        arr -> ((Filiere) arr[0]).name(),
                        arr -> (Long) arr[1]
                ));
        stats.put("byFiliere", filiereStats);

        // 2. Par niveau
        List<Object[]> byNiveau = userRepository.countStudentsByNiveau();
        Map<String, Long> niveauStats = byNiveau.stream()
                .filter(arr -> arr[0] != null)
                .collect(Collectors.toMap(
                        arr -> ((Niveau) arr[0]).name(),
                        arr -> (Long) arr[1]
                ));
        stats.put("byNiveau", niveauStats);

        // 3. Combiné filière/niveau
        List<Object[]> byFiliereNiveau = userRepository.countStudentsByFiliereAndNiveau();
        Map<String, Map<String, Long>> combinedStats = new HashMap<>();

        byFiliereNiveau.stream()
                .filter(arr -> arr[0] != null && arr[1] != null)
                .forEach(arr -> {
                    String filiere = ((Filiere) arr[0]).name();
                    String niveau = ((Niveau) arr[1]).name();
                    Long count = (Long) arr[2];

                    combinedStats
                            .computeIfAbsent(filiere, k -> new HashMap<>())
                            .put(niveau, count);
                });

        stats.put("byFiliereAndNiveau", combinedStats);

        return stats;
    }




}
