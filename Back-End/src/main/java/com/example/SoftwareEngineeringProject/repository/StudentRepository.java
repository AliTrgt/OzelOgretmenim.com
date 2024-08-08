package com.example.SoftwareEngineeringProject.repository;

import com.example.SoftwareEngineeringProject.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository

public interface StudentRepository extends JpaRepository<Student,Integer> {

    Optional<Student> findByUser_Username(String username);

    Optional<Student> findStudentByUserId(int userId);
}
