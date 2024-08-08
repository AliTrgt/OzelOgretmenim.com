package com.example.SoftwareEngineeringProject.controller;

import com.example.SoftwareEngineeringProject.entity.User;
import com.example.SoftwareEngineeringProject.exception.IdNotFoundException;
import com.example.SoftwareEngineeringProject.request.LoginRequest;
import com.example.SoftwareEngineeringProject.request.SecurityRoleRequestService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
public class UserController {

    private final AuthenticationManager authenticationManager;

    private final SecurityRoleRequestService securityRoleRequestService;

    public UserController(AuthenticationManager authenticationManager, SecurityRoleRequestService securityRoleRequestService) {
        this.authenticationManager = authenticationManager;
        this.securityRoleRequestService = securityRoleRequestService;
    }


    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@RequestBody LoginRequest loginRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword())
            );
            SecurityContextHolder.getContext().setAuthentication(authentication);

            UserDetails userDetails = (UserDetails) authentication.getPrincipal();

            String role =  authentication.getAuthorities().toString();

            return ResponseEntity.ok(userDetails.getUsername()+userDetails.getAuthorities().toString());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logoutUser() throws IdNotFoundException {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

            if(authentication != null){
                    SecurityContextHolder.clearContext();
            }

            else {
                throw new IdNotFoundException("Account Not Logged In");
            }

            return  ResponseEntity.status(HttpStatus.OK).body("User Logged Out Successfuly");

    }

        @GetMapping("/getInfo")
        public User getUserCredentials(){
            return securityRoleRequestService.getUserPrincipal();
        }


}
