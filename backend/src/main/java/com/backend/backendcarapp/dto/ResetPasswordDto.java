package com.backend.backendcarapp.dto;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
@Getter
@AllArgsConstructor
public class ResetPasswordDto {
    @NotBlank
    private String token;
    @Size(min = 6)
    private String password;
}
