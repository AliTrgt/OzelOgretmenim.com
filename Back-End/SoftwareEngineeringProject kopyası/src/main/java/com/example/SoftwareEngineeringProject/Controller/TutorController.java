package com.example.SoftwareEngineeringProject.Controller;

import com.example.SoftwareEngineeringProject.Entity.Tutor;
import com.example.SoftwareEngineeringProject.Entity.User;
import com.example.SoftwareEngineeringProject.Request.LoginRequest;
import com.example.SoftwareEngineeringProject.Service.TutorService;
import com.example.SoftwareEngineeringProject.Service.UserService;
import com.example.SoftwareEngineeringProject.Exception.IdNotFoundException;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tutor")
public class TutorController {

        private final TutorService tutorService;
        private final UserService userService;

    public TutorController(TutorService tutorService, UserService userService) {
        this.tutorService = tutorService;
        this.userService = userService;
    }


    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping
    public List<Tutor> getAllTutor(){
        return tutorService.getAllTutor();
    }

    @GetMapping("/{tutorId}")
    public Tutor findById(@PathVariable(name = "tutorId") int tutorId) throws IdNotFoundException {
        return tutorService.findById(tutorId);
    }

    @PostMapping("/register")
    public Tutor createTutor(@RequestBody Tutor tutor){
        return tutorService.createTutor(tutor);
    }


    @PreAuthorize("(hasRole('ROLE_TUTOR') and #tutorId == principal.id)  or hasRole('ROLE_ADMIN')")
    @PutMapping("/update/{tutorId}")
    public Tutor updateTutor(@PathVariable int tutorId,@RequestBody Tutor tutor) throws IdNotFoundException {
        return tutorService.updateTutor(tutorId,tutor);
    }


    @PreAuthorize("(hasRole('ROLE_TUTOR') and #tutorId == principal.id)  or hasRole('ROLE_ADMIN')")
    @DeleteMapping("/delete/{tutorId}")
    public void deleteTutors(@PathVariable int tutorId) throws IdNotFoundException {
        tutorService.deleteTutor(tutorId);
    }







}
