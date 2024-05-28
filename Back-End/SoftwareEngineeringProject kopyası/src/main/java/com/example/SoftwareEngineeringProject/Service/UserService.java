package com.example.SoftwareEngineeringProject.Service;

import com.example.SoftwareEngineeringProject.Entity.User;
import com.example.SoftwareEngineeringProject.Repository.TutorRepository;
import com.example.SoftwareEngineeringProject.Repository.UserRepository;
import com.example.SoftwareEngineeringProject.Exception.IdNotFoundException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final TutorService tutorService;
    private final TutorRepository tutorRepository;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, TutorService tutorService, TutorRepository tutorRepository) {

        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.tutorService = tutorService;
        this.tutorRepository = tutorRepository;
    }

    public Optional<User> getByUsername(String username) throws IdNotFoundException {
        return userRepository.findByUsername(username);
    }







}