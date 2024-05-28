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

    public Optional<User> findByUsername(String username){
        return userRepository.findByUsername(username);
    }


    public User loginUser(String username,String password) throws IdNotFoundException {
        User user = userRepository.findByUsername(username).orElseThrow( ()  -> new IdNotFoundException("Username Not Found : "+username));

        if(user != null && passwordEncoder.matches(password,user.getPassword()) ){
            return user;
        }

        else  throw new IdNotFoundException("Kullanıcı adı ya da parola yanlış");

    }




}