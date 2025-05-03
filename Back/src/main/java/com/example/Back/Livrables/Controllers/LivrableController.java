package com.example.Back.Livrables.Controllers;

import com.example.Back.Auth.Repositories.UserRepository;
import com.example.Back.Livrables.Models.Livrable;
import com.example.Back.Livrables.Models.LivrableRequestDTO;
import com.example.Back.Livrables.Models.LivrableUpdateDTO;
import com.example.Back.Livrables.Services.LivrableService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.net.URI;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/livrable")
public class LivrableController {
    private final LivrableService livrableService;
    private final UserRepository userRepository;

    @Value("${file.upload-dir:uploads}/livrables")
    private String uploadDir;

    public LivrableController(LivrableService livrableService,
                              UserRepository userRepository) {
        this.livrableService = livrableService;
        this.userRepository = userRepository;
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Livrable> createLivrable(
            @Valid @ModelAttribute LivrableRequestDTO request
    ) {
        try {
            Livrable saved = livrableService.createLivrable(request, request.fichier());
            return ResponseEntity
                    .created(URI.create("/api/livrable/" + saved.getId()))
                    .body(saved);
        } catch (IOException e) {
            throw new IllegalArgumentException("Erreur lors du traitement du fichier", e);
        }
    }

    @GetMapping
    public List<Livrable> getLivrables() {
        return livrableService.getLivrables();
    }

    @GetMapping("/etudiant/{etudiantId}")
    public List<Livrable> getByEtudiant(@PathVariable Long etudiantId) {
        return livrableService.getLivrablesByEtudiantId(etudiantId);
    }

    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Livrable> updateLivrable(
            @PathVariable Long id,
            @Valid @ModelAttribute LivrableUpdateDTO request,
            Principal principal) {
        Livrable updated = livrableService.updateLivrable(id, request, principal.getName());
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLivrable(
            @PathVariable Long id,
            Principal principal) {
        livrableService.deleteLivrable(id, principal.getName());
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}/valider")
    public ResponseEntity<Livrable> validerLivrable(
            @PathVariable Long id,
            Principal principal) {
        Livrable l = livrableService.validerLivrable(id, principal.getName());
        return ResponseEntity.ok(l);
    }

    @PutMapping("/{id}/refuser")
    public ResponseEntity<Livrable> refuserLivrable(
            @PathVariable Long id,
            Principal principal) {
        Livrable l = livrableService.refuserLivrable(id, principal.getName());
        return ResponseEntity.ok(l);
    }

    /**
     * Endpoint pour télécharger/visualiser un fichier enregistré.
     */
    @GetMapping("/download/{filename:.+}")
    public ResponseEntity<Resource> downloadFile(@PathVariable String filename) throws IOException {
        Path file = Paths.get(uploadDir).resolve(filename).normalize();
        if (!Files.exists(file) || Files.isDirectory(file)) {
            return ResponseEntity.notFound().build();
        }
        UrlResource resource = new UrlResource(file.toUri());
        String contentType = Files.probeContentType(file);
        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType != null ? contentType : MediaType.APPLICATION_OCTET_STREAM_VALUE))
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + resource.getFilename() + "\"")
                .body(resource);
    }
}
