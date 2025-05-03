package com.example.Back.Livrables.Models;

import com.example.Back.enums.TypeLivrable;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.springframework.web.multipart.MultipartFile;

public record LivrableRequestDTO(
        @NotNull Long etudiantId,
        @NotBlank String titre,
        @NotNull TypeLivrable type,
        @NotNull MultipartFile fichier
) {}
