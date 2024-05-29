package com.example.SoftwareEngineeringProject.Controller;


import com.example.SoftwareEngineeringProject.Entity.Notice;
import com.example.SoftwareEngineeringProject.Entity.Tutor;
import com.example.SoftwareEngineeringProject.Entity.User;
import com.example.SoftwareEngineeringProject.Repository.TutorRepository;
import com.example.SoftwareEngineeringProject.Repository.UserRepository;
import com.example.SoftwareEngineeringProject.Service.NoticeService;
import com.example.SoftwareEngineeringProject.Service.UserService;
import com.example.SoftwareEngineeringProject.Exception.IdNotFoundException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/notice")
public class NoticeController {

    private final NoticeService noticeService;
    private final UserService userService;
    private  final TutorRepository tutorRepository;
    private final UserRepository userRepository;



    public NoticeController(NoticeService noticeService, UserService userService, TutorRepository tutorRepository, UserRepository userRepository) {
        this.noticeService = noticeService;
        this.userService = userService;
        this.tutorRepository = tutorRepository;
        this.userRepository = userRepository;
    }


    @GetMapping
    public List<Notice> getAllNotice(){
        return noticeService.getAllNotice();
    }


    @GetMapping("/myNotices/{tutorId}")
    public List<Notice> getNoticeByTutor(@PathVariable int tutorId) throws IdNotFoundException {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) authentication.getPrincipal();

        Optional<Tutor> tutor =tutorRepository.findTutorByUserId(user.getId());

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


    @PutMapping("/update/{noticeId}")
    public Notice updateNotice(@PathVariable int noticeId, @RequestBody Notice notice) throws IdNotFoundException {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) authentication.getPrincipal();

        Optional<Tutor> tutor = tutorRepository.findTutorByUserId(user.getId());

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
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) authentication.getPrincipal();

        Optional<Tutor> tutor = tutorRepository.findTutorByUserId(user.getId());

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
