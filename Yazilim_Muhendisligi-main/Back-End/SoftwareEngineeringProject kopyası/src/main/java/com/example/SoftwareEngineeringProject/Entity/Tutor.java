package com.example.SoftwareEngineeringProject.Entity;


import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@Table(name = "tbl_tutor")
public class Tutor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String firstName;

    private String lastName;

    private String subject;

    private LocalDateTime registerDate;

    private String city;

    private String image;

    private String gender;

    @Lob
    private String description;

    private String email;

    private String telephoneNumber;

    @OneToMany(mappedBy = "tutor",cascade = CascadeType.ALL,orphanRemoval = true)
    @JsonBackReference
    private List<Appointment> appointmentList;

    @OneToMany(mappedBy = "tutor",cascade = CascadeType.ALL,orphanRemoval = true)
    @JsonBackReference
    private List<Notice> noticeList;

    @OneToOne(cascade = CascadeType.ALL,orphanRemoval = true)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;


}
