package com.example.Back.Entreprises.Controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.http.converter.HttpMessageNotReadableException;

import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<?> handleJsonParseError(HttpMessageNotReadableException ex) {
        Map<String, Object> errorBody = new HashMap<>();
        errorBody.put("error", "INVALID_JSON_FORMAT");
        errorBody.put("message", "Erreur lors du parsing JSON : " + ex.getMostSpecificCause().getMessage());

        return new ResponseEntity<>(errorBody, HttpStatus.BAD_REQUEST);
    }
}
