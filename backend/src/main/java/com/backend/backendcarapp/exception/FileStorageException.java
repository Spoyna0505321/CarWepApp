package com.backend.backendcarapp.exception;
public class FileStorageException extends RuntimeException {
    public FileStorageException(String message,Throwable throwable) {
        super(message,throwable);
    }
}
