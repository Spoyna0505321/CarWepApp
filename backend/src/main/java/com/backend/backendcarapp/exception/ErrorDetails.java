package com.backend.backendcarapp.exception;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Setter
@Getter
public class ErrorDetails {
    private String message;
    private int status;
    private LocalDateTime timestamp;
    private String error;

    public ErrorDetails(String message, int status, LocalDateTime timestamp, String error) {
        this.message = message;
        this.status = status;
        this.timestamp = timestamp;
        this.error = error;
    }

}
