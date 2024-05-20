package com.example.SoftwareEngineeringProject.Controller;


import com.example.SoftwareEngineeringProject.Entity.Student;
import com.example.SoftwareEngineeringProject.Service.StudentService;
import com.example.SoftwareEngineeringProject.Exception.IdNotFoundException;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/student")
public class StudentController {

    private final StudentService studentService;

    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }


    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping
    public List<Student> getAllStudent(){
            return studentService.getAllStudent();
    }



    @GetMapping("/{studentId}")
    public Student findById(@PathVariable int studentId) throws IdNotFoundException {
        return studentService.findById(studentId);
    }


    @PostMapping("/create")
    public Student createStudent(@RequestBody Student student){
        return studentService.createStudent(student);
    }



    @PreAuthorize("(hasRole('ROLE_STUDENT') and #studentId == principal.id) or hasRole('ROLE_ADMIN')")
    @PutMapping("/update/{studentId}")
    public Student updateStudent(@PathVariable int studentId,@RequestBody Student student) throws IdNotFoundException {
        return studentService.updateStudent(studentId,student);
    }


    @PreAuthorize("(hasRole('ROLE_STUDENT') and #studentId == principal.id) or hasRole('ROLE_ADMIN')")
    @DeleteMapping("/delete/{studentId}")
    public void deleteStudent(@PathVariable int studentId) throws IdNotFoundException {
            studentService.deleteStudent(studentId);
    }








}
