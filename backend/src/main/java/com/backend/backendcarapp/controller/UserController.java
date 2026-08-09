package com.backend.backendcarapp.controller;
import com.backend.backendcarapp.dto.*;
import com.backend.backendcarapp.entity.User;
import com.backend.backendcarapp.service.JWTService;
import com.backend.backendcarapp.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.util.Map;
@RestController()
@RequestMapping("/api")
public class UserController {
    private final UserService userService;
    private final JWTService jwtService;
    public UserController(UserService userService, JWTService jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }
    @PostMapping("/auth/signup")
    public ResponseEntity<?> signup(@Valid @RequestBody RegisterDto registerDto) {
        userService.register(registerDto);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(Map.of("message", "User registered successfully"));
    }
    @PostMapping("/auth/signin")
    public LoginResponseDto login(@Valid @RequestBody LoginDto loginDto) {
        return userService.verify(loginDto);
    }
    @GetMapping("/get-car-model")
    public CarModelDto  getCarModelName(@AuthenticationPrincipal User currentUser){
        return userService.getCarModel(currentUser);
    }
    @PostMapping("/auth/refresh")
    public TokenDto refresh(@Valid @RequestBody RefreshTokenDto refreshTokenDto) {
        return jwtService.RefreshToken(refreshTokenDto.getRefreshToken());

    }
    @PostMapping("/auth/logout")
    public ResponseEntity<?> logout(@Valid @RequestBody RefreshTokenDto refreshTokenDto) {
        jwtService.DeleteToken(refreshTokenDto.getRefreshToken());
        return ResponseEntity.ok(
                Map.of("message", "Logout successful")
        );
    }
    @GetMapping("/auth/verify")
    public ResponseEntity<?> verifyEmail(@RequestParam String token){
        String message = jwtService.handleVerification(token);
        return ResponseEntity.ok(
                Map.of("message", message)
        );
    }
    @PutMapping("/user/upload")
    public ResponseEntity<?> uploadProfileImage(@RequestParam MultipartFile file, @AuthenticationPrincipal User currentUser){
        userService.storeAvatar(file, currentUser);
        return ResponseEntity.ok(
                Map.of("message", "Image Uploaded")
        );
    }
    @GetMapping("/user/avatar")
    public ResponseEntity<?> getProfilePhoto(@AuthenticationPrincipal User currentUser){
        return userService.getProfilePhoto(currentUser);
    }
    @GetMapping ("/user/profile")
    public ProfileDto getProfileInfo(@AuthenticationPrincipal User currentUser){
        return userService.getProfileInfo(currentUser);
    }
    @PutMapping("/set-car-model")
    public ResponseEntity<?> setCarModel(@Valid @RequestBody CarModelDto carModelDto, @AuthenticationPrincipal User currentUser){
        userService.setCarModelName(carModelDto,currentUser);
        return ResponseEntity.ok(
                Map.of("message", "Car name changed")
        );
    }
    @PostMapping("/auth/forgot-password")
    public void forgetPassword(@Valid @RequestBody ResetPasswordRequestDto email){
        userService.sendResetPassword(email);
    }
    @PostMapping("/auth/reset-password")
    public void resetPassword(ResetPasswordDto resetPasswordDto){
        userService.resetPassword(resetPasswordDto);
    }
    @GetMapping("/auth/reset-password")
    public ResponseEntity<?> verifyResetPassword(@RequestParam String token){
        userService.validatePasswordResetToken(token);
        return ResponseEntity.ok(
                Map.of("message", "Password changed successfully")
        );
    }
    @PutMapping("/set-displayName")
    public ResponseEntity<?> setDisplayName(@Valid @RequestBody DisplayNameDto displayName,@AuthenticationPrincipal User currentUser){
        userService.setDisplayName(displayName,currentUser);
        return ResponseEntity.ok(
                Map.of("message", "Display name changed successfully"));
    }
    @PutMapping("/update-language")
    public ResponseEntity<?> setDisplayName(@Valid @RequestBody UpdateLanguageDto updateLanguageDto,@AuthenticationPrincipal User currentUser){
        userService.updateLanguage(updateLanguageDto,currentUser);
        return ResponseEntity.ok(
                Map.of("message", "Display name changed successfully"));
    }
    @PutMapping("/user/change-password")
    public ResponseEntity<?> changePassword(@Valid @RequestBody ChangePasswordDto changePasswordDto,@AuthenticationPrincipal User currentUser){
        userService.changePassword(changePasswordDto,currentUser);
        return ResponseEntity.ok(
                Map.of("message", "Display name changed successfully"));
    }

}
