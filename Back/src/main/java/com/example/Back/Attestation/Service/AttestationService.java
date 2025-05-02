package com.example.Back.Attestation.Service;

import com.example.Back.Attestation.Model.Attestation;
import com.example.Back.Attestation.Model.AttestationDTO;
import com.example.Back.Attestation.Repositories.AttestationRepository;
import com.example.Back.Auth.Models.User;
import com.example.Back.Auth.Repositories.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Date;

@Service
@Transactional
public class AttestationService {

    @Autowired
    private AttestationRepository attestationRepository;

    @Value("${file.upload-dir}/attestations")
    private String uploadDir;
    @Autowired
    private UserRepository userRepository;

    public AttestationDTO uploadAttestation(User etudiant, MultipartFile file) throws IOException {
        File uploadDirectory = new File(uploadDir);
        if (!uploadDirectory.exists()) {
            uploadDirectory.mkdirs();
        }

        String fileName =file.getOriginalFilename();
        Path filePath = Paths.get(uploadDir, fileName);
        Files.write(filePath, file.getBytes());

        User fullEtudiant = userRepository.findById(etudiant.getId())
                .orElseThrow(() -> new RuntimeException("Étudiant non trouvé"));

        Attestation attestation = new Attestation();
        attestation.setEtudiant(fullEtudiant);
        attestation.setNomFichier(file.getOriginalFilename());
        attestation.setCheminFichier(filePath.toString());
        attestation.setDateDepot(new Date());


        Attestation saved = attestationRepository.save(attestation);

        AttestationDTO dto = new AttestationDTO();
        dto.setId(saved.getId());
        dto.setEtudiantId(fullEtudiant.getId());
        dto.setNomEtudiant(fullEtudiant.getNom());
        dto.setPrenomEtudiant(fullEtudiant.getPrenom());
        dto.setSexe(fullEtudiant.getSexe());
        dto.setNomFichier(saved.getNomFichier());
        dto.setCheminFichier(saved.getCheminFichier());
        dto.setDateDepot(saved.getDateDepot());


        return dto;
    }
}