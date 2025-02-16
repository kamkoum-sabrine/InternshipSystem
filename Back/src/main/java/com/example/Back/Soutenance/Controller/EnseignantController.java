package com.example.Back.Soutenance.Controller;


import com.example.Back.Soutenance.Model.Enseignant;
import com.example.Back.Soutenance.Service.EnseignantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/v1/enseingnant")
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

    @PostMapping
    public void addEnseignant(@RequestBody Enseignant enseignant) {
        enseignantService.addEnseignant(enseignant);
    }

    @DeleteMapping(path = "{id}")
    public void deleteEnseignant(@PathVariable("id") Long id) {
        enseignantService.deleteEnseignant(id);
    }

    @PutMapping(path = "{id}")
    public void updateEnseignant(@PathVariable("id") Long id,
                                 @RequestParam (required = false) String nom,
                                 @RequestParam (required = false) String prenom,
                                 @RequestParam (required = false) String email
                                 )
    {
            enseignantService.editEnseignant(id,nom,prenom,email) ;

    }
}
