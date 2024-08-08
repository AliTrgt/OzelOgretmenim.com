package com.example.SoftwareEngineeringProject.exception;

import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class UserAlreadyExistException extends Exception {

    public UserAlreadyExistException(String message){
            super(message);
    }

}
