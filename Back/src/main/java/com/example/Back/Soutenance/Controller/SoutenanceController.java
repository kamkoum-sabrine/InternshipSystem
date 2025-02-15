package com.example.Back.Soutenance.Controller;


import com.example.Back.Soutenance.Model.Soutenance;
import com.example.Back.Soutenance.Service.SoutenanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@RestController
@RequestMapping(path = "api/v1/soutenance")
public class SoutenanceController {

    private final SoutenanceService soutenanceService;

    @Autowired
    public SoutenanceController(SoutenanceService soutenanceService) {
        this.soutenanceService = soutenanceService;
    }

    @GetMapping
    public List<Soutenance> getAllSoutenance() {
        return soutenanceService.getAllSoutenances();
    }

    @PostMapping
    public void createSoutenance(@RequestBody Soutenance soutenance) {
        soutenanceService.addSoutenance(soutenance);
    }

    @DeleteMapping(path = "{id}")
    public void deleteSoutenance(@PathVariable("id") Long id) {
        if (id == null) {
            throw new IllegalArgumentException("L'ID ne doit pas être nul.");
        }
        soutenanceService.deleteSoutenance(id);
    }

    @PutMapping(path = "{id}")
    public void editSoutenance(@PathVariable("id") Long id,
                               @RequestParam(required = false) LocalDate date,
                               @RequestParam(required = false) Integer salle,
                               @RequestParam(required = false) LocalTime heure,
                               @RequestParam(required = false) Long etudiantId,
                               @RequestParam(required = false) Long encadrantId,
                               @RequestParam(required = false) List<String> jury,
                               @RequestParam(required = false) String sujet) {
        if (id == null) {
            throw new IllegalArgumentException("L'ID ne doit pas être nul.");
        }
        soutenanceService.editSoutenance(id, date, salle, heure, etudiantId, encadrantId, jury ,sujet);
    }
}

