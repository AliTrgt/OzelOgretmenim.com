package com.example.SoftwareEngineeringProject.controller;


import com.example.SoftwareEngineeringProject.entity.Notice;
import com.example.SoftwareEngineeringProject.entity.Tutor;
import com.example.SoftwareEngineeringProject.entity.User;
import com.example.SoftwareEngineeringProject.repository.TutorRepository;
import com.example.SoftwareEngineeringProject.repository.UserRepository;
import com.example.SoftwareEngineeringProject.request.SecurityRoleRequestService;
import com.example.SoftwareEngineeringProject.service.NoticeService;
import com.example.SoftwareEngineeringProject.exception.IdNotFoundException;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/notice")
public class NoticeController {

    private final NoticeService noticeService;
    private  final TutorRepository tutorRepository;

    private final SecurityRoleRequestService authService;

    public NoticeController(NoticeService noticeService, TutorRepository tutorRepository, SecurityRoleRequestService authService) {
        this.noticeService = noticeService;
        this.tutorRepository = tutorRepository;
        this.authService = authService;
    }


    @GetMapping
    public List<Notice> getAllNotice(){
        return noticeService.getAllNotice();
    }


    @GetMapping("/myNotices/{tutorId}")
    public List<Notice> getNoticeByTutor(@PathVariable int tutorId) throws IdNotFoundException {
        Optional<Tutor> tutor =tutorRepository.findTutorByUserId(authService.getUserPrincipal().getId());

        if(tutor.isPresent()){
            Tutor theTutor = tutor.get();
            int tempTutorId = theTutor.getId();
            List<Notice> notices = noticeService.findNoticeByTutorId(theTutor.getId());

            List<Notice> noticeList = notices.stream()
                    .filter(notice -> notice.getTutor().getId() == tempTutorId)
                    .collect(Collectors.toList());
            if (noticeList.isEmpty()) {
                throw new IdNotFoundException("No notices found for the given tutor ID.");
            }

            return  noticeList;
        }
        else {
            throw new RuntimeException("it doesn't work getNoticeByTutor");
        }
    }



    @PostMapping("/create")
    public Notice createNoticeForLoggedInUser(@RequestBody Notice notice) throws IdNotFoundException {
        Optional<Tutor> tutor = tutorRepository.findTutorByUserId(authService.getUserPrincipal().getId());
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


    @PutMapping("/update/{noticeId}")
    public Notice updateNotice(@PathVariable int noticeId, @RequestBody Notice notice) throws IdNotFoundException {
        Optional<Tutor> tutor = tutorRepository.findTutorByUserId(authService.getUserPrincipal().getId());

        if (tutor.isPresent()) {
            Tutor tempTutor = tutor.get();
            int tutorId = tempTutor.getId();
            Notice existingNotice = noticeService.findById(noticeId);
            if (existingNotice.getTutor().getId() == tutorId) {
                return noticeService.updateNotice(noticeId, notice);
            } else {
                throw new AccessDeniedException("You do not have permission to update this notice.");
            }
        } else {
            throw new IdNotFoundException("Id Not Found");
        }
    }



    @DeleteMapping("/delete/{noticeId}")
    public void deleteNotice(@PathVariable int noticeId) throws IdNotFoundException {
        Optional<Tutor> tutor = tutorRepository.findTutorByUserId(authService.getUserPrincipal().getId());

        if (tutor.isPresent()) {
            Tutor tempTutor = tutor.get();
            int tutorId = tempTutor.getId();
            Notice existingNotice = noticeService.findById(noticeId);
            if (existingNotice.getTutor().getId() == tutorId) {
                noticeService.deleteNotice(noticeId);
            } else {
                throw new AccessDeniedException("You do not have permission to delete this notice.");
            }
        } else {
            throw new IdNotFoundException("Id Not Found");
        }
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
