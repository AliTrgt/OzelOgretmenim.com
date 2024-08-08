package com.example.SoftwareEngineeringProject.entity;

import org.springframework.security.core.GrantedAuthority;

public enum Role implements GrantedAuthority {

    ROLE_TUTOR,

    ROLE_STUDENT,

    ROLE_ADMIN;

    @Override
    public String getAuthority() {
        return name();
    }





}
