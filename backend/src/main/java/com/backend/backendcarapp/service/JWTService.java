package com.backend.backendcarapp.service;
import com.backend.backendcarapp.dto.TokenClaimsDto;
import com.backend.backendcarapp.dto.TokenDto;
import com.backend.backendcarapp.entity.RefreshToken;
import com.backend.backendcarapp.entity.User;
import com.backend.backendcarapp.exception.*;
import com.backend.backendcarapp.repository.RefreshTokenRepository;
import com.backend.backendcarapp.repository.UserRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import javax.crypto.SecretKey;
import java.sql.Date;
import java.time.Duration;
import java.time.Instant;
@Service
public class JWTService {
    @Value("${jwt.secret}")
    private String secretKey;
    private final RefreshTokenRepository refreshTokenRepository;
    private final UserRepository userRepository;
    public JWTService(RefreshTokenRepository refreshTokenRepository, UserRepository userRepository) {
        this.refreshTokenRepository = refreshTokenRepository;
        this.userRepository = userRepository;
    }

    public String generateToken(String email) {
        return Jwts.builder()
                .subject(email)
                .claim("type","access")
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + 1000L * 60 * 60 * 10))
                .signWith(getSecretKey())
                .compact();
    }
    public String createVerificationToken(String email) {
        Instant now = Instant.now();

        return Jwts.builder()
                .subject(email)
                .claim("type", "verification")
                .issuedAt(Date.from(now))
                .expiration(Date.from(now.plus(Duration.ofMinutes(15))))
                .signWith(getSecretKey())
                .compact();
    }
    public String createResetPasswordToken(String email){
        Instant now = Instant.now();
        return Jwts.builder()
                .subject(email)
                .claim("type","reset_password")
                .issuedAt(Date.from(now))
                .expiration(Date.from(now.plus(Duration.ofMinutes(15))))
                .signWith(getSecretKey())
                .compact();

    }
    public String handleVerification(String token){
        TokenClaimsDto tokenClaimsDto = extractClaims(token);
        java.util.Date today = new java.util.Date();
        if(today.after(tokenClaimsDto.getExpiration())){
           throw new VerificationTokenExpiredException("This link expired");
        }
        if(!"verification".equals(tokenClaimsDto.getType())){
            throw new InvalidVerificationTokenException("Invalid Token Type");
        }
        User user = userRepository.findByEmail(tokenClaimsDto.getEmail()).orElseThrow(()->new UserNotExistException("User not found"));
        if(user.isEnabled()){
            throw  new UserAlreadyVerifiedException("User already verified");
        }
        user.setEnabled(true);
        userRepository.save(user);
        return "Email verified successfully";
    }
    public String generateRefreshToken(String email) {
        return Jwts.builder()
                .subject(email)
                .claim("type","refresh")
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + 1000L * 60 * 60 * 24 * 30))
                .signWith(getSecretKey())
                .compact();
    }
    public SecretKey getSecretKey() {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }
    public TokenClaimsDto extractClaims(String token){
        Claims claims = Jwts.parser().verifyWith(getSecretKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
        return new TokenClaimsDto(
                claims.getSubject(),
                claims.get("type",String.class),
                claims.getExpiration()
        );
    }
    public boolean validateToken(String token, UserDetails userDetails) {
        TokenClaimsDto tokenClaimsDto = extractClaims(token);
        boolean isTokenExpired =  tokenClaimsDto.getExpiration().after(new Date(System.currentTimeMillis()));
        String email = tokenClaimsDto.getEmail();
        return email.equals(userDetails.getUsername()) && isTokenExpired;
    }
    public TokenDto RefreshToken(String token) {

        RefreshToken refreshToken = refreshTokenRepository.findByRefreshToken(token)
                .orElseThrow(() -> new RefreshTokenNotFoundException("Refresh token not found"));
        if (refreshToken.getExpiryDate().before(new java.util.Date())) {
            throw new RefreshTokenExpiredException("Token has expired");
        }
        User user = refreshToken.getUser();

        return new TokenDto(generateToken(user.getEmail()), refreshToken.getRefreshToken());
    }
    public void DeleteToken(String token) {
        RefreshToken refreshToken = refreshTokenRepository.findByRefreshToken(token)
                .orElseThrow(() -> new RefreshTokenNotFoundException("Refresh token not found"));
        refreshTokenRepository.delete(refreshToken);
    }
}
