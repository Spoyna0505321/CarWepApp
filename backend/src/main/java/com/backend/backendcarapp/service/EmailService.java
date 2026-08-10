package com.backend.backendcarapp.service;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
@Service
public class EmailService {
    private final JWTService jwtService;
    private final JavaMailSender javaMailSender;
    public EmailService(JWTService jwtService, JavaMailSender javaMailSender) {
        this.jwtService = jwtService;
        this.javaMailSender = javaMailSender;
    }
    public void SendVerificationEmail(String email) {
        String verificationToken =  jwtService.createVerificationToken(email);
        String verifyUrl = "https://carwebapp-backend.onrender.com/verify?token=" +
                URLEncoder.encode(verificationToken, StandardCharsets.UTF_8);
        String message = "Click below to verify your email:\n" + verifyUrl;
        SimpleMailMessage mail = new SimpleMailMessage();
        mail.setTo(email);
        mail.setSubject("Verify your email");
        mail.setText(message);
        javaMailSender.send(mail);
    }
    public void SendResetPassword(String email,String resetPasswordToken){
        String verifyUrl = "https://carwebapp-backend.onrender.com/reset-password?token=" +
                URLEncoder.encode(resetPasswordToken, StandardCharsets.UTF_8);
        String message = "Click below to reset your password:\n" + verifyUrl;
        SimpleMailMessage mail = new SimpleMailMessage();
        mail.setTo(email);
        mail.setSubject("Reset your password");
        mail.setText(message);
        javaMailSender.send(mail);
    }
}
