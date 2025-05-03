package com.example.Back.Livrables.Models;

import com.example.Back.enums.TypeLivrable;
import jakarta.validation.constraints.Size;
import org.springframework.web.multipart.MultipartFile;

public record LivrableUpdateDTO(
        @Size(max = 255) String titre,
        TypeLivrable type,
        MultipartFile fichier
) {}