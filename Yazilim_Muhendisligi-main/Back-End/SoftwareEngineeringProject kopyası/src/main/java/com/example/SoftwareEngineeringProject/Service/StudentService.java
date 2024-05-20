package com.example.SoftwareEngineeringProject.Service;


import com.example.SoftwareEngineeringProject.Entity.Role;
import com.example.SoftwareEngineeringProject.Entity.Student;
import com.example.SoftwareEngineeringProject.Entity.User;
import com.example.SoftwareEngineeringProject.Repository.StudentRepository;
import com.example.SoftwareEngineeringProject.Exception.IdNotFoundException;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class StudentService {

    private final StudentRepository studentRepository;
    private  final BCryptPasswordEncoder passwordEncoder;
    public StudentService(StudentRepository studentRepository, BCryptPasswordEncoder passwordEncoder) {
        this.studentRepository = studentRepository;
        this.passwordEncoder = passwordEncoder;
    }


    public List<Student> getAllStudent(){
            return studentRepository.findAll();
    }

    public Student findById(int studentId) throws  IdNotFoundException{
         return studentRepository.findById(studentId).orElseThrow( () -> new IdNotFoundException("Id Not Found Student : "+studentId));
    }



    public Student createStudent(Student student){
        User user = User.builder()
                .username(student.getUser().getUsername())
                .password(passwordEncoder.encode(student.getUser().getPassword()))
                .authorities(Collections.singleton(Role.ROLE_STUDENT))
                .accountNonLocked(true)
                .accountNonExpired(true)
                .isCredentialsNonExpired(true)
                .isEnabled(true)
                .build();


        Student savedStudent = Student.builder()
                .firstName(student.getFirstName())
                .lastName(student.getLastName())
                .user(user)
                .build();

        return studentRepository.save(savedStudent);
    }


    public void deleteStudent(int studentId) throws IdNotFoundException{
            Student student = studentRepository.findById(studentId).orElseThrow( () -> new IdNotFoundException("Id Not Found Student : "+studentId));
            studentRepository.deleteById(student.getId());
    }

    public Student updateStudent(int studentId,Student student) throws IdNotFoundException {
            Optional<Student> savedStudent = studentRepository.findById(studentId);

            if(savedStudent.isPresent()) {
                Student tempStudent = savedStudent.get();
                tempStudent.setFirstName(student.getFirstName());
                tempStudent.setLastName(student.getLastName());

                studentRepository.save(tempStudent);

                return tempStudent;

            }
            else {
                 throw new IdNotFoundException("Id Not Found Student : "+studentId);
            }





    }

}
