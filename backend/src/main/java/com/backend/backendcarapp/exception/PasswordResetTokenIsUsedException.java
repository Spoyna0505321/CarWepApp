package com.backend.backendcarapp.exception;

public class PasswordResetTokenIsUsedException extends RuntimeException {
    public PasswordResetTokenIsUsedException(String message) {
        super(message);
    }
}
