package com.example.Back.Livrables.Services;


import com.example.Back.Auth.Models.User;
import com.example.Back.Auth.Repositories.UserRepository;
import com.example.Back.Livrables.Models.Livrable;
import com.example.Back.Livrables.Models.LivrableRequestDTO;
import com.example.Back.Livrables.Models.LivrableUpdateDTO;
import com.example.Back.Livrables.Repository.Livrablerepository;
import com.example.Back.enums.EtatLivrable;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@Transactional
public class LivrableService {
    private final Livrablerepository livrableRepository;
    private final UserRepository userRepository;

    public LivrableService(Livrablerepository livrableRepository, UserRepository userRepository) {
        this.livrableRepository = livrableRepository;
        this.userRepository = userRepository;
    }

    public List<Livrable> getLivrables() {
        return livrableRepository.findAll();
    }

    public Livrable createLivrable(LivrableRequestDTO request, MultipartFile fichier) throws IOException {
        User etudiant = userRepository.findById(request.etudiantId())
                .orElseThrow(() -> new EntityNotFoundException("Étudiant non trouvé"));

        if (!etudiant.getRole().getNom().equals("ETUDIANT")) {
            throw new AccessDeniedException("Seuls les étudiants peuvent déposer des livrables");
        }

        String uniqueFileName = generateUniqueFileName(fichier.getOriginalFilename());
        Path filePath = saveFile(fichier, uniqueFileName);

        Livrable livrable = new Livrable();
        livrable.setEtudiant(etudiant);
        livrable.setTitre(request.titre());
        livrable.setType(request.type());
        livrable.setDateDepot(LocalDate.now());
        livrable.setFichierPDFNom(uniqueFileName);
        livrable.setFichierPDFChemin(filePath.toString());
        livrable.setEtat(EtatLivrable.Déposé);

        return livrableRepository.save(livrable);
    }

    private String generateUniqueFileName(String originalName) {
        return UUID.randomUUID() + "_" + originalName;
    }

    private Path saveFile(MultipartFile file, String fileName) throws IOException {
        Path uploadPath = Paths.get("uploads/livrables");
        if (!Files.exists(uploadPath)) Files.createDirectories(uploadPath);

        Path filePath = uploadPath.resolve(fileName);
        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
        return filePath;
    }

    public List<Livrable> getLivrablesByEtudiantId(Long etudiantId) {
        User etudiant = userRepository.findById(etudiantId)
                .orElseThrow(() -> new EntityNotFoundException("Étudiant non trouvé"));
        return livrableRepository.findByEtudiant(etudiant);
    }

    public Livrable updateLivrable(Long id, LivrableUpdateDTO request, String Username) {
        User currentUser = userRepository.findByEmail(Username)
                .orElseThrow(() -> new EntityNotFoundException("Utilisateur non trouvé"));

        Livrable livrable = livrableRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Livrable non trouvé"));


        // Mise à jour des champs
        updateLivrableFields(livrable, request);

        return livrableRepository.save(livrable);
    }

    public void deleteLivrable(Long id, String Username) {
        User currentUser = userRepository.findByEmail(Username)
                .orElseThrow(() -> new EntityNotFoundException("Utilisateur non trouvé"));

        Livrable livrable = livrableRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Livrable non trouvé"));


        // Suppression du fichier
        deleteFile(livrable.getFichierPDFChemin());

        livrableRepository.delete(livrable);
    }



    private void updateLivrableFields(Livrable livrable, LivrableUpdateDTO request) {
        if (request.titre() != null) {
            livrable.setTitre(request.titre());
        }
        if (request.type() != null) {
            livrable.setType(request.type());
        }
        if (request.fichier() != null && !request.fichier().isEmpty()) {
            updateFile(livrable, request.fichier());
        }
    }

    private void updateFile(Livrable livrable, MultipartFile newFile) {
        try {
            // Suppression ancien fichier
            deleteFile(livrable.getFichierPDFChemin());

            // Création nouveau fichier
            String fileName = generateUniqueFileName(newFile.getOriginalFilename());
            Path filePath = saveFile(newFile, fileName);

            livrable.setFichierPDFNom(fileName);
            livrable.setFichierPDFChemin(filePath.toString());
        } catch (IOException e) {
            throw new IllegalArgumentException("Échec de la mise à jour du fichier");
        }
    }

    private void deleteFile(String filePath) {
        try {
            Files.deleteIfExists(Path.of(filePath));
        } catch (IOException e) {
            throw new IllegalArgumentException("Échec de la suppression du fichier");
        }
    }
}