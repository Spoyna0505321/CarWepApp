package com.backend.backendcarapp.entity;
import com.backend.backendcarapp.dto.Language;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import java.util.Collection;
import java.util.List;
@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "users")
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true,nullable = false)
    private String email;
    @Column(nullable = false)
    private String displayName;
    @Column(name = "avatar_path")
    private String avatarPath;
    @Column(name = "avatar_public_id")
    private String avatarPublicId;
    private String password;
    @Column(nullable = false)
    private boolean  enabled;
    private String carModelName;
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Language language = Language.EN;
    @Override
    @NonNull
    public String getUsername() {
        return email;
    }
    @Override
    @NonNull
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of();
    }
    @Override
    public boolean isEnabled() {
        return enabled;
    }
}
