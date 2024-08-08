package com.example.SoftwareEngineeringProject.service;

import com.example.SoftwareEngineeringProject.entity.User;
import com.example.SoftwareEngineeringProject.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class SecurityUser implements UserDetailsService {

    private final UserRepository userRepository;

    public SecurityUser(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
            Optional<User> user = userRepository.findByUsername(username);
            return user.orElseThrow(EntityNotFoundException::new);
    }




}
