package com.example.SoftwareEngineeringProject.controller;


import com.example.SoftwareEngineeringProject.entity.Student;
import com.example.SoftwareEngineeringProject.entity.User;
import com.example.SoftwareEngineeringProject.repository.NoticeRepository;
import com.example.SoftwareEngineeringProject.repository.StudentRepository;
import com.example.SoftwareEngineeringProject.repository.TutorRepository;
import com.example.SoftwareEngineeringProject.request.SecurityRoleRequestService;
import com.example.SoftwareEngineeringProject.service.StudentService;
import com.example.SoftwareEngineeringProject.exception.IdNotFoundException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/student")
public class StudentController {

    private final StudentService studentService;

    private final StudentRepository studentRepository;

    private final SecurityRoleRequestService authService;

    public StudentController(StudentService studentService, StudentRepository studentRepository, SecurityRoleRequestService authService) {
        this.studentService = studentService;
        this.studentRepository = studentRepository;

        this.authService = authService;
    }


    @GetMapping
    public List<Student> getAllStudent(){
            return studentService.getAllStudent();
    }



    @GetMapping("/{studentId}")
    public Student findById(@PathVariable(name="studentId") int studentId) throws IdNotFoundException {
        return studentService.findById(studentId);
    }


    @PostMapping("/create")
    public Student createStudent(@RequestBody Student student){
        return studentService.createStudent(student);
    }



    @PutMapping("/update/{studentId}")
    public Student updateStudent(@PathVariable int studentId, @RequestBody Student student) throws IdNotFoundException {
        Optional<Student> tempStudent = studentRepository.findStudentByUserId(authService.getUserPrincipal().getId());

        if (tempStudent.isPresent()) {
            Student existingStudent = tempStudent.get();
            if (existingStudent.getId() == studentId) {
                student.setId(existingStudent.getId()); // Ensure the ID matches
                return studentService.updateStudent(studentId,student);
            } else {
                throw new IdNotFoundException("Tutor Found but not updated");
            }
        } else {
            throw new IdNotFoundException("Tutor Not Found");
        }
    }



    @DeleteMapping("/delete/{studentId}")
    public void deleteStudent(@PathVariable int studentId) throws IdNotFoundException {
        Optional<Student> tempStudent = studentRepository.findStudentByUserId(authService.getUserPrincipal().getId());
        if(tempStudent.isPresent()){
            Student existingStudent = tempStudent.get();
            if(existingStudent.getId() == studentId){
                studentRepository.deleteById(studentId);
            }

            else {
                throw new IdNotFoundException("Student Found But Not Deleted");
            }
        }

        else {
            throw new IdNotFoundException("Student Not Found");
        }
    }








}
