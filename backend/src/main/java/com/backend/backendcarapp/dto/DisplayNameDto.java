package com.backend.backendcarapp.dto;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
@Getter
@AllArgsConstructor
public class DisplayNameDto {
    @NotBlank
    private String displayName;
}
