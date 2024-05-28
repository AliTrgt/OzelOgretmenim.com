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
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

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


    @PostMapping("/create")
    public Notice createNoticeForLoggedInUser(HttpServletRequest request, @RequestBody Notice notice) throws IdNotFoundException {
        HttpSession session = request.getSession(false);
        if (session == null) {
            throw new RuntimeException("No active session");
        }

        SecurityContext securityContext = (SecurityContext) session.getAttribute("SPRING_SECURITY_CONTEXT");
        if (securityContext == null) {
            throw new RuntimeException("Security context not found in session");
        }

        Authentication authentication = securityContext.getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new RuntimeException("User is not authenticated");
        }

        String loggedInUsername = authentication.getName();
        Optional<Tutor> tutor = tutorRepository.findByUser_Username(loggedInUsername);
        if (tutor.isPresent()) {
            Tutor tempUser = tutor.get();
            int tutorId = tempUser.getId();
            return noticeService.createNotice(notice, tutorId);
        }

        throw new IdNotFoundException("Tutor not found for the logged-in user");
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
