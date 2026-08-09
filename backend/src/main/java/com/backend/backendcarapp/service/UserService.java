package com.backend.backendcarapp.service;
import com.backend.backendcarapp.dto.*;
import com.backend.backendcarapp.entity.PasswordResetToken;
import com.backend.backendcarapp.entity.RefreshToken;
import com.backend.backendcarapp.entity.User;
import com.backend.backendcarapp.exception.*;
import com.backend.backendcarapp.repository.RefreshTokenRepository;
import com.backend.backendcarapp.repository.ResetPasswordTokenRepository;
import com.backend.backendcarapp.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.sql.Date;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.UUID;
@Service
public class UserService {
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JWTService jwtService;
    private final RefreshTokenRepository refreshTokenRepository;
    private final EmailService emailService;
    private final ResetPasswordTokenRepository resetPasswordTokenRepository;
    private final CloudinaryService cloudinaryService;


    public UserService(UserRepository userRepository, BCryptPasswordEncoder bCryptPasswordEncoder, AuthenticationManager authenticationManager, JWTService jwtService, RefreshTokenRepository refreshTokenRepository, EmailService emailService, ResetPasswordTokenRepository resetPasswordTokenRepository, CloudinaryService cloudinaryService) {
        this.userRepository = userRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
        this.refreshTokenRepository = refreshTokenRepository;

        this.emailService = emailService;
        this.resetPasswordTokenRepository = resetPasswordTokenRepository;
        this.cloudinaryService = cloudinaryService;
    }
    public void register(RegisterDto registerDto) {
       
        if(userRepository.findByEmail(registerDto.getEmail()).isPresent()){
            throw new UserAlreadyExistsException("Email already exists");

        }
        User user = new User();
        user.setEmail(registerDto.getEmail());
        user.setPassword(bCryptPasswordEncoder.encode(registerDto.getPassword()));
        user.setDisplayName(registerDto.getDisplayName());
        user.setCarModelName("Car Model");
        userRepository.save(user);
        emailService.SendVerificationEmail(registerDto.getEmail());

    }
    public LoginResponseDto verify(LoginDto loginDto) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginDto.getEmail(),loginDto.getPassword()));
        if (authentication.isAuthenticated()) {
            User currentUser =(User) authentication.getPrincipal();
            refreshTokenRepository.deleteByUser(currentUser);
            LoginResponseDto loginResponseDto = new LoginResponseDto(jwtService.generateToken(loginDto.getEmail()),jwtService.generateRefreshToken(loginDto.getEmail()),currentUser.getLanguage());
            RefreshToken refreshToken = new RefreshToken();
            refreshToken.setRefreshToken(loginResponseDto.getRefreshToken());
            refreshToken.setExpiryDate(new Date(System.currentTimeMillis() + 1000L * 60 * 60 * 24 * 30));
            refreshToken.setUser(currentUser);
            refreshTokenRepository.save(refreshToken);
            return loginResponseDto;

        }
        return null;

    }
    @Transactional
    public void setCarModelName(CarModelDto carModelName,User currentUser){
        User user = userRepository.findById(currentUser.getId()).orElseThrow(()->new UserNotExistException("User not found."));
        user.setCarModelName(carModelName.getCarModelName());
    }
    @Transactional
    public void storeAvatar(MultipartFile file, User currentUser) {

        validateImage(file);

        User user = userRepository.findById(currentUser.getId())
                .orElseThrow(() ->
                        new UserNotExistException("User not found.")
                );
        String oldPublicId = user.getAvatarPublicId();
        Map<String, String> uploadedImage =
                cloudinaryService.uploadImage(file);
        String newUrl = uploadedImage.get("url");
        String newPublicId = uploadedImage.get("publicId");
        user.setAvatarPath(newUrl);
        user.setAvatarPublicId(newPublicId);
        userRepository.save(user);
        if (oldPublicId != null) {
            cloudinaryService.deleteImage(oldPublicId);
        }
    }
    private void validateImage(MultipartFile file) {
        if (file.isEmpty()) {
            throw new IllegalArgumentException("No file received");
        }

        if (file.getSize() > 2 * 1024 * 1024) {
            throw new IllegalArgumentException("Image is too large");
        }

        String contentType = file.getContentType();
        if (!List.of("image/jpeg", "image/png", "image/webp").contains(contentType)) {
            throw new IllegalArgumentException("Unsupported image type");
        }

        try (InputStream in = file.getInputStream()) {
            BufferedImage image = ImageIO.read(in);
            if (image == null) {
                throw new IllegalArgumentException("File is not a valid image");
            }
        } catch (Exception ex) {
            throw new IllegalStateException("Could not read uploaded file");
        }
    }

    public CarModelDto getCarModel(User currentUser) {
        User user = userRepository.findById(currentUser.getId()).orElseThrow(()-> new UserNotExistException("User not found"));
        return new CarModelDto(user.getCarModelName());
    }
    public ResponseEntity<?> getProfilePhoto(User currentUser) {
        User user = userRepository.findById(currentUser.getId()).orElseThrow(()-> new UserNotExistException("User not found"));
        if (user.getAvatarPath() == null) {
            return ResponseEntity.notFound().build();
        }
        Path path = Paths.get("profile-photos",user.getAvatarPath());
        Resource resource = UrlResource.from(path.toUri());
        return  ResponseEntity.ok().contentType(MediaType.IMAGE_PNG).body(resource);
    }
    public void sendResetPassword(ResetPasswordRequestDto email){
        User user = userRepository.findByEmail(email.getEmail()).orElseThrow(()-> new UserNotExistException("User not found"));
        String resetPasswordToken = jwtService.createResetPasswordToken(email.getEmail());
        PasswordResetToken passwordResetToken = new PasswordResetToken();
        passwordResetToken.setToken(resetPasswordToken);
        passwordResetToken.setUser(user);
        passwordResetToken.setUsed(false);
        passwordResetToken.setExpiryDate(LocalDateTime.now().plusMinutes(15));
        resetPasswordTokenRepository.save(passwordResetToken);
        emailService.SendResetPassword(email.getEmail(),resetPasswordToken);
    }
    public PasswordResetToken  validatePasswordResetToken(String token) {

        PasswordResetToken passToken =
                resetPasswordTokenRepository
                        .findByToken(token)
                        .orElseThrow(() ->
                                new PasswordResetTokenNotFoundException(
                                        "Password reset token not found."
                                ));
        if(passToken.isUsed()){
            throw new PasswordResetTokenIsUsedException("this token is already used");
        }
        if (isTokenExpired(passToken)) {
            throw new PasswordResetTokenExpiredException(
                    "Password reset token expired."
            );
        }
        return passToken;

    }
    private boolean isTokenExpired(PasswordResetToken passToken) {
        return passToken.getExpiryDate().isBefore(LocalDateTime.now());
    }
    public ProfileDto getProfileInfo(User currentUser) {
        User user = userRepository.findById(currentUser.getId())
                .orElseThrow(() -> new UserNotExistException("User not found"));

        return new ProfileDto(
                user.getEmail(),
                user.getDisplayName(),
                user.getAvatarPath(),
                user.getCarModelName(),
                user.getLanguage()
        );
    }

    public void resetPassword(ResetPasswordDto resetPasswordDto) {
        PasswordResetToken passwordResetToken=  validatePasswordResetToken(resetPasswordDto.getToken());
        User user = passwordResetToken.getUser();
        user.setPassword(bCryptPasswordEncoder.encode(resetPasswordDto.getPassword()));
        userRepository.save(user);
        passwordResetToken.setUsed(true);
        resetPasswordTokenRepository.save(passwordResetToken);
    }
    @Transactional
    public void setDisplayName(DisplayNameDto displayNameDto,User currentUser){
        User user = userRepository.findById(currentUser.getId()).orElseThrow(()->new UserNotExistException("User not found."));
        user.setDisplayName(displayNameDto.getDisplayName());
    }
    @Transactional
    public void updateLanguage(UpdateLanguageDto updateLanguageDto,User currentUser){
        User user = userRepository.findById(currentUser.getId()).orElseThrow(()->new UserNotExistException("User not found."));
        user.setLanguage(updateLanguageDto.getLanguage());
    }
    @Transactional
    public void changePassword(ChangePasswordDto changePasswordDto,User currentUser){
        if(!bCryptPasswordEncoder.matches(changePasswordDto.getOldPassword(), currentUser.getPassword())){
            throw new InvalidPasswordException("Current password is incorrect.");
        }

        if(changePasswordDto.getOldPassword().equals(changePasswordDto.getNewPassword())){
            throw new IllegalArgumentException("New password must be different.");
        }

        currentUser.setPassword(bCryptPasswordEncoder.encode(changePasswordDto.getNewPassword()));
        userRepository.save(currentUser);
    }

}
