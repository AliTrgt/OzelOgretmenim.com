package com.example.SoftwareEngineeringProject.request;


import com.example.SoftwareEngineeringProject.entity.User;
import lombok.Data;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Data
@Service
public class SecurityRoleRequestService {
    // it's returning User info for front-end side
    public User getUserPrincipal(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User myUser = (User) authentication.getPrincipal();
        return myUser;
    }


}
