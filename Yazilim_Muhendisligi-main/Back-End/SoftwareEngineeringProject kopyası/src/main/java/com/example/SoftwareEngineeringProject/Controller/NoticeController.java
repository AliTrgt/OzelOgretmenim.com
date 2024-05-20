package com.example.SoftwareEngineeringProject.Controller;


import com.example.SoftwareEngineeringProject.Entity.Notice;
import com.example.SoftwareEngineeringProject.Entity.Tutor;
import com.example.SoftwareEngineeringProject.Entity.User;
import com.example.SoftwareEngineeringProject.Repository.TutorRepository;
import com.example.SoftwareEngineeringProject.Service.NoticeService;
import com.example.SoftwareEngineeringProject.Service.TutorService;
import com.example.SoftwareEngineeringProject.Service.UserService;
import com.example.SoftwareEngineeringProject.Exception.IdNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/notice")
public class NoticeController {

    private final NoticeService noticeService;
    private final UserService userService;
    private  final TutorRepository tutorRepository;

    public NoticeController(NoticeService noticeService, UserService userService,TutorRepository tutorRepository) {
        this.noticeService = noticeService;
        this.userService = userService;
        this.tutorRepository = tutorRepository;
    }


    @GetMapping
    public List<Notice> getAllNotice(){
        return noticeService.getAllNotice();
    }


    @PostMapping("/create")
    public Notice createNoticeForLoggedInUser(@RequestBody Notice notice) throws IdNotFoundException {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) authentication.getPrincipal();


        Optional<Tutor> tutor = tutorRepository.findTutorByUserId(user.getId());

        if(tutor.isPresent()) {
            Tutor tempTutor = tutor.get();
            int tutorId = tempTutor.getId();
            return noticeService.createNotice(notice, tutorId);
        }
        else {
            throw new IdNotFoundException("Id Not ");
        }
    }


    @GetMapping("/{noticeId}")
    public Notice findById(@PathVariable int noticeId) throws IdNotFoundException {
            return noticeService.findById(noticeId);
    }


    @PreAuthorize("(hasRole('ROLE_TUTOR') and @noticeService.findById(#noticeId).tutor.id == principal.id) or hasRole('ROLE_ADMIN')")
    @PutMapping("/update/{noticeId}")
    public Notice updateNotice(@PathVariable int noticeId,@RequestBody Notice notice) throws IdNotFoundException {
        return noticeService.updateNotice(noticeId,notice);
    }



    @PreAuthorize("(hasRole('ROLE_TUTOR') and @noticeService.findById(#noticeId).tutor.id == principal.id) or hasRole('ROLE_ADMIN')")
    @DeleteMapping("/delete/{noticeId}")
    public void deleteNotice(@PathVariable int noticeId) throws IdNotFoundException {
         noticeService.deleteNotice(noticeId);
    }


    @GetMapping("/filter")
    public List<Notice> findByParameter(@RequestParam(name = "city",required = false) String city,@RequestParam(name = "gender",required = false) String gender,@RequestParam(name = "subject",required = false) String subject){
            return  noticeService.findByParameters(city, gender, subject);
    }


    @GetMapping("/price")
    public List<Notice> findByPriceRange(@RequestParam Double minPrice,@RequestParam Double maxPrice){
        return noticeService.findByRange(minPrice,maxPrice);
    }

}
