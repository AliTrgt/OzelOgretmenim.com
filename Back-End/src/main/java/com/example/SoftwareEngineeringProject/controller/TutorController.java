package com.example.SoftwareEngineeringProject.controller;

import com.example.SoftwareEngineeringProject.entity.Tutor;
import com.example.SoftwareEngineeringProject.entity.User;
import com.example.SoftwareEngineeringProject.repository.NoticeRepository;
import com.example.SoftwareEngineeringProject.repository.TutorRepository;
import com.example.SoftwareEngineeringProject.request.SecurityRoleRequestService;
import com.example.SoftwareEngineeringProject.service.TutorService;
import com.example.SoftwareEngineeringProject.exception.IdNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/tutor")
public class TutorController {

        private final TutorService tutorService;

        private final TutorRepository tutorRepository;

        private final NoticeRepository noticeRepository;

        private final SecurityRoleRequestService authService;

    public TutorController(TutorService tutorService, TutorRepository tutorRepository, NoticeRepository noticeRepository, SecurityRoleRequestService authService) {
        this.tutorService = tutorService;
        this.tutorRepository = tutorRepository;
        this.noticeRepository = noticeRepository;
        this.authService = authService;
    }


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


    @PutMapping("/update/{tutorId}")
    public Tutor updateTutor(@PathVariable int tutorId, @RequestBody Tutor tutor) throws IdNotFoundException {
        Optional<Tutor> tempTutor = tutorRepository.findTutorByUserId(authService.getUserPrincipal().getId());

        if (tempTutor.isPresent()) {
            Tutor existingTutor = tempTutor.get();
            if (existingTutor.getId() == tutorId) {
                tutor.setId(existingTutor.getId()); // Ensure the ID matches
                return tutorService.updateTutor(tutorId, tutor);
            } else {
                throw new IdNotFoundException("Tutor Found but not updated");
            }
        } else {
            throw new IdNotFoundException("Tutor Not Found");
        }
    }


    @Transactional
    @DeleteMapping("/delete/{tutorId}")
    public void deleteTutors(@PathVariable int tutorId) throws IdNotFoundException {
        Optional<Tutor> tempTutor = tutorRepository.findTutorByUserId(authService.getUserPrincipal().getId());
        if(tempTutor.isPresent()){
            Tutor existenceTutor = tempTutor.get();
            if(existenceTutor.getId() == tutorId){

                noticeRepository.deleteByTutorId(tutorId);
                tutorRepository.deleteById(tutorId);
            }

            else {
                throw new IdNotFoundException("Tutor Found But Not Deleted");
            }
        }

        else {
            throw new IdNotFoundException("Tutor Not Found");
        }
    }







}
