package com.example.SoftwareEngineeringProject.Repository;

import com.example.SoftwareEngineeringProject.Entity.Tutor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TutorRepository extends JpaRepository<Tutor,Integer> {


    Optional<Tutor> findByUser_Username(String username);

    Optional<Tutor> findTutorByUserId(int userId);



}
