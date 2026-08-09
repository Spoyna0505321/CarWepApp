package com.backend.backendcarapp.exception;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import java.time.LocalDateTime;
@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorDetails> handleGlobalException(Exception ex) {
        ErrorDetails error = new ErrorDetails(
                ex.getMessage(),
                HttpStatus.INTERNAL_SERVER_ERROR.value(),
                LocalDateTime.now(),
                "Internal Server Error"
        );
        return new ResponseEntity<>(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    @ExceptionHandler(UserAlreadyExistsException.class)
    public ResponseEntity<ErrorDetails> handleUserAlreadyExistsException(Exception ex) {
        ErrorDetails error = new ErrorDetails(
                ex.getMessage(),
                HttpStatus.CONFLICT.value(),
                LocalDateTime.now(),
                "User already exists"
        );
        return new ResponseEntity<>(error, HttpStatus.CONFLICT);
    }
    @ExceptionHandler(RefreshTokenNotFoundException.class)
    public ResponseEntity<ErrorDetails> handleRefreshTokenNotFoundException(Exception ex) {
        ErrorDetails error = new ErrorDetails(
                ex.getMessage(),
                HttpStatus.NOT_FOUND.value(),
                LocalDateTime.now(),
                "Refresh token not found"
        );
        return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
    }
    @ExceptionHandler(RefreshTokenExpiredException.class)
    public ResponseEntity<ErrorDetails> handleRefreshTokenExpiredException(Exception ex) {
        ErrorDetails error = new ErrorDetails(
                ex.getMessage(),
                HttpStatus.UNAUTHORIZED.value(),
                LocalDateTime.now(),
                "Unauthorized"
        );
        return new ResponseEntity<>(error, HttpStatus.UNAUTHORIZED);
    }
    @ExceptionHandler(UserNotExistException.class)
    public ResponseEntity<ErrorDetails> handleUserNotExistException(Exception ex){
        ErrorDetails error = new ErrorDetails(
                ex.getMessage(),
                HttpStatus.NOT_FOUND.value(),
                LocalDateTime.now(),
                "Not Found"
        );
        return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
    }
    @ExceptionHandler(VerificationTokenExpiredException.class)
    public ResponseEntity<ErrorDetails> handleVerificationTokenExpiredException(Exception ex){
        ErrorDetails error = new ErrorDetails(
                ex.getMessage(),
                HttpStatus.GONE.value(),
                LocalDateTime.now(),
                "Token expired"
        );
        return new ResponseEntity<>(error, HttpStatus.GONE);
    }
    @ExceptionHandler(UserAlreadyVerifiedException.class)
    public ResponseEntity<ErrorDetails> handleUserAlreadyVerifiedException(Exception ex){
        ErrorDetails error = new ErrorDetails(
                ex.getMessage(),
                HttpStatus.CONFLICT.value(),
                LocalDateTime.now(),
                "User already verified"
        );
        return new ResponseEntity<>(error, HttpStatus.CONFLICT);
    }
    @ExceptionHandler(InvalidVerificationTokenException.class)
    public ResponseEntity<ErrorDetails> handleInvalidVerificationTokenException(Exception ex){
        ErrorDetails error = new ErrorDetails(
                ex.getMessage(),
                HttpStatus.BAD_REQUEST.value(),
                LocalDateTime.now(),
                "Invalid Token"
        );
        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }
    @ExceptionHandler(FileStorageException.class)
    public ResponseEntity<ErrorDetails> handleFileStorageException(
            FileStorageException ex
           ) {

        ErrorDetails error = new ErrorDetails(
                ex.getMessage(),
                HttpStatus.INTERNAL_SERVER_ERROR.value(),
                LocalDateTime.now(),
                "File Storage Error"
        );

        return new ResponseEntity<>(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    @ExceptionHandler(DisabledException.class)
    public ResponseEntity<ErrorDetails> handleDisabledException(Exception ex) {
        ErrorDetails error = new ErrorDetails(
                ex.getMessage(),
                HttpStatus.FORBIDDEN.value(),
                LocalDateTime.now(),
                "Forbidden"
        );
        return new ResponseEntity<>(error, HttpStatus.FORBIDDEN);
    }
    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<ErrorDetails> handleBadCredentialsException(){
        ErrorDetails error = new ErrorDetails(
                "Email or password is wrong.",
                HttpStatus.UNAUTHORIZED.value(),
                LocalDateTime.now(),
                "Unauthorized"
        );
        return new ResponseEntity<>(error,HttpStatus.UNAUTHORIZED);
    }
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorDetails> handleValidation(
            MethodArgumentNotValidException ex) {

        String message = ex.getBindingResult()
                .getFieldError()
                .getDefaultMessage();

        ErrorDetails error = new ErrorDetails(
                message,
                HttpStatus.BAD_REQUEST.value(),
                LocalDateTime.now(),
                "Validation Error"
        );

        return ResponseEntity.badRequest().body(error);
    }
    @ExceptionHandler(PasswordResetTokenNotFoundException.class)
    public ResponseEntity<ErrorDetails> handlePasswordResetTokenNotFoundException(
            Exception ex) {
        ErrorDetails error = new ErrorDetails(
                ex.getMessage(),
                HttpStatus.NOT_FOUND.value(),
                LocalDateTime.now(),
                "Not Found."
        );

        return new ResponseEntity<>(error,HttpStatus.NOT_FOUND);
    }
    @ExceptionHandler(PasswordResetTokenExpiredException.class)
    public ResponseEntity<ErrorDetails> handlePasswordResetTokenExpired(
            PasswordResetTokenExpiredException ex) {

        ErrorDetails error = new ErrorDetails(
                ex.getMessage(),
                HttpStatus.GONE.value(),
                LocalDateTime.now(),
                "Password reset token expired"
        );

        return new ResponseEntity<>(error, HttpStatus.GONE);
    }
    @ExceptionHandler(PasswordResetTokenIsUsedException.class)
    public ResponseEntity<ErrorDetails> handlePasswordResetTokenIsUsedException(
            PasswordResetTokenExpiredException ex) {
        ErrorDetails error = new ErrorDetails(
                ex.getMessage(),
                HttpStatus.GONE.value(),
                LocalDateTime.now(),
                "Password reset token is used"
        );

        return new ResponseEntity<>(error, HttpStatus.GONE);
    }
    @ExceptionHandler(InvalidPasswordException.class)
    public ResponseEntity<ErrorDetails> handleInvalidPasswordException(
            InvalidPasswordException ex) {

        ErrorDetails error = new ErrorDetails(
                ex.getMessage(),
                HttpStatus.BAD_REQUEST.value(),
                LocalDateTime.now(),
                "Invalid password"
        );

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
    }
}
