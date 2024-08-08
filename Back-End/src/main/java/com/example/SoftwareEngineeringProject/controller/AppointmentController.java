package com.example.SoftwareEngineeringProject.controller;

import com.example.SoftwareEngineeringProject.entity.Appointment;
import com.example.SoftwareEngineeringProject.service.AppointmentService;
import com.example.SoftwareEngineeringProject.exception.IdNotFoundException;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/appointment")
public class AppointmentController {

        private final AppointmentService appointmentService;


    public AppointmentController(AppointmentService appointmentService) {
        this.appointmentService = appointmentService;
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping
    public List<Appointment> getAllAppointment(){
        return appointmentService.getAllAppointment();
    }


    @GetMapping("/{appId}")
    public Appointment getById(@PathVariable int appId) throws IdNotFoundException {
        return appointmentService.findById(appId);
    }

    @PostMapping("/create")
    public Appointment createAppointment(@RequestBody Appointment appointment) throws IdNotFoundException {
        return appointmentService.createAppointment(appointment);
    }


    @PutMapping("/update/{appId}")
    public Appointment updateAppointment(@PathVariable int appId,@RequestBody Appointment appointment) throws IdNotFoundException {
        return  appointmentService.updateAppointment(appId,appointment);
    }

    @DeleteMapping("/delete/{appId}")
    public void deleteAppointment(@PathVariable int appId) throws IdNotFoundException {
            appointmentService.deleteAppointment(appId);
    }



}
