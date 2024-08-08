package com.example.SoftwareEngineeringProject.exception;


import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class IdNotFoundException extends Exception {

        public IdNotFoundException(String errorMessage){
            super(errorMessage);
        }




}
