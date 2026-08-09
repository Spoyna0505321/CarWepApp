package com.backend.backendcarapp.dto;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RegisterDto {
    @NotBlank(message = "Email alanı boş bırakılamaz")
    private String email;
    @NotBlank(message = "Ad alanı boş bırakılamaz")
    private String displayName;
    @NotBlank(message = "Şifre alanı boş bırakılamaz")
    @Size(min = 6,message = "Parola 6 haneden büyük olmalı")
    private String password;
    private String carModelName;
    @Enumerated(EnumType.STRING)
    private Language language = Language.EN;
}
