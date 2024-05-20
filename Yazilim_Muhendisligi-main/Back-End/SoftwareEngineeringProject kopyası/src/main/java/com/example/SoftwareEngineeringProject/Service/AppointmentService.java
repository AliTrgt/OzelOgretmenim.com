package com.example.SoftwareEngineeringProject.Service;


import com.example.SoftwareEngineeringProject.Entity.*;
import com.example.SoftwareEngineeringProject.Repository.AppointmentRepository;
import com.example.SoftwareEngineeringProject.Exception.IdNotFoundException;
import com.example.SoftwareEngineeringProject.Repository.StudentRepository;
import com.example.SoftwareEngineeringProject.Repository.TutorRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final TutorService tutorService;

    private final StudentRepository studentRepository;

    private final TutorRepository tutorRepository;

    public AppointmentService(AppointmentRepository appointmentRepository, TutorService tutorService, StudentRepository studentRepository, TutorRepository tutorRepository) {
        this.appointmentRepository = appointmentRepository;
        this.tutorService = tutorService;
        this.studentRepository = studentRepository;
        this.tutorRepository = tutorRepository;
    }


    public List<Appointment> getAllAppointment(){
        return appointmentRepository.findAll();
    }


    public Appointment createAppointment(Appointment appointment) throws IdNotFoundException {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userName = authentication.getName();

        Optional<Student> optionalStudent = studentRepository.findByUser_Username(userName);

        if(optionalStudent.isPresent()){
            Student student = optionalStudent.get();

            Optional<Tutor> optionalTutor = tutorRepository.findById(appointment.getTutor().getId());

            if(optionalTutor.isPresent()){
                Tutor tutor = optionalTutor.get();
                String tutorSubject = tutor.getSubject();
                appointment.setStudent(student);
                appointment.setTutor(tutor);
                appointment.setAppointmentDate(appointment.getAppointmentDate());
                appointment.setEnabled(true);
                appointment.setSubject(tutorSubject);
                return appointmentRepository.save(appointment);
            }
            else {
                throw new IdNotFoundException("Requested Tutor not found");
            }

        }

        return appointment;
    }




    public Appointment findById(int appointmentId) throws IdNotFoundException {
            return appointmentRepository.findById(appointmentId).orElseThrow(() -> new IdNotFoundException("Id Not Found Appointment :"+appointmentId));

    }




    public Appointment updateAppointment(int appointmentId,Appointment appointment) throws IdNotFoundException {
        Optional<Appointment> savedAppointment = appointmentRepository.findById(appointmentId);

            if(savedAppointment.isPresent()){
                    Appointment tempAppointment = savedAppointment.get();
                    tempAppointment.setAppointmentDate(appointment.getAppointmentDate());
                    tempAppointment.setEnabled(appointment.isEnabled());
                    tempAppointment.setSubject(appointment.getSubject());
                    appointmentRepository.save(tempAppointment);

                    return tempAppointment;
            }

            else {
                    throw new IdNotFoundException("Id Not Found Appointment : "+appointmentId);
            }

    }


    public void deleteAppointment(int appointmentId) throws IdNotFoundException {
        Appointment appointment = appointmentRepository.findById(appointmentId).orElseThrow( () -> new IdNotFoundException("Id Not Found Appointment"+appointmentId));
        appointmentRepository.deleteById(appointment.getId());
    }


}
