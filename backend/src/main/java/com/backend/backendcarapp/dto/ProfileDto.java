package com.backend.backendcarapp.dto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProfileDto {
    private String email;
    private String displayName;
    private String avatarPath;
    private String carModelName;
    private Language language;
}
