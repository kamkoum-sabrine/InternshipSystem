package com.example.Back.Livrables.Controllers;


import com.example.Back.Auth.Repositories.UserRepository;

import com.example.Back.Livrables.Models.Livrable;
import com.example.Back.Livrables.Models.LivrableRequestDTO;
import com.example.Back.Livrables.Models.LivrableUpdateDTO;
import com.example.Back.Livrables.Repository.Livrablerepository;
import com.example.Back.Livrables.Services.LivrableService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.net.URI;
import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/livrable")
public class LivrableController {
    private final LivrableService livrableService;
    private final Livrablerepository livrablerepository;
    private final UserRepository userRepository;

    @Value("${file.upload-dir}/livrable")
    private String uploadDir;

    @Autowired
    public LivrableController(LivrableService livrableService, Livrablerepository livrablerepository, UserRepository userRepository) {
        this.livrableService = livrableService;
        this.livrablerepository = livrablerepository;
        this.userRepository = userRepository;
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Livrable> createLivrable(
            @Valid @ModelAttribute LivrableRequestDTO request
    ) {
        try {
            Livrable savedLivrable = livrableService.createLivrable(request, request.fichier());
            return ResponseEntity.created(URI.create("/api/livrables/" + savedLivrable.getId()))
                    .body(savedLivrable);
        } catch (IOException e) {
            throw new IllegalArgumentException("Erreur lors du traitement du fichier");
        }
    }

    @GetMapping()
    public List<Livrable> getLivrables() {
        return livrableService.getLivrables();
    }

    @GetMapping("/etudiant/{etudiantId}")
    public List<Livrable> getLivrablesByEtudiant(@PathVariable Long etudiantId) {
        return livrableService.getLivrablesByEtudiantId(etudiantId);
    }

    // Mise à jour d'un livrable (PUT)
    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Livrable> updateLivrable(
            @PathVariable Long id,
            @Valid @ModelAttribute LivrableUpdateDTO request,
            Principal principal) {

        Livrable updatedLivrable = livrableService.updateLivrable(
                id,
                request,
                principal.getName()
        );
        return ResponseEntity.ok(updatedLivrable);
    }

    // Suppression d'un livrable (DELETE)
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLivrable(
            @PathVariable Long id,
            Principal principal) {

        livrableService.deleteLivrable(id, principal.getName());
        return ResponseEntity.noContent().build();
    }



}
