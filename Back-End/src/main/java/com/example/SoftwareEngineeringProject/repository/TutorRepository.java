package com.example.SoftwareEngineeringProject.repository;

import com.example.SoftwareEngineeringProject.entity.Tutor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TutorRepository extends JpaRepository<Tutor,Integer> {


    Optional<Tutor> findByUser_Username(String username);

    Optional<Tutor> findTutorByUserId(int userId);



}
