package com.example.Back.Soutenance.Controller;


import com.example.Back.Soutenance.DTO.SoutenanceDTO;
import com.example.Back.Soutenance.Model.Enseignant;
import com.example.Back.Soutenance.Service.EnseignantService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/enseignant")
public class EnseignantController {

    private final EnseignantService enseignantService;


    @Autowired
    public EnseignantController(EnseignantService enseignantService) {
        this.enseignantService = enseignantService;
    }

    @GetMapping
    public List<Enseignant> getAllEnseignant() {
        return enseignantService.getEnseignants();
    }

    @GetMapping(path = "{id}")
    public Enseignant getEnseignantById(@PathVariable("id") Long id) {
        return enseignantService.getEnseignantsById(id);
    }



    @PostMapping
    public void addEnseignant(@RequestBody Enseignant enseignant) {
        enseignantService.addEnseignant(enseignant);
    }

    @DeleteMapping(path = "{id}")
    public void deleteEnseignant(@PathVariable("id") Long id) {
        enseignantService.deleteEnseignant(id);

    }

    @PutMapping(path = "{id}")
    public void updateEnseignant(@PathVariable("id") Long id,@Valid @RequestBody Enseignant enseignant
                                 )
    {
            enseignantService.editEnseignant(id,enseignant) ;

    }
}
