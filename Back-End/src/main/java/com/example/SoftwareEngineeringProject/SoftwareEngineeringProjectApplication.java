package com.example.SoftwareEngineeringProject;

import com.example.SoftwareEngineeringProject.entity.Role;
import com.example.SoftwareEngineeringProject.entity.Student;
import com.example.SoftwareEngineeringProject.entity.User;
import com.example.SoftwareEngineeringProject.repository.StudentRepository;
import com.example.SoftwareEngineeringProject.repository.TutorRepository;
import com.example.SoftwareEngineeringProject.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.Set;

@SpringBootApplication
public class SoftwareEngineeringProjectApplication{

	public static void main(String[] args) {
		SpringApplication.run(SoftwareEngineeringProjectApplication.class, args);
	}


}
