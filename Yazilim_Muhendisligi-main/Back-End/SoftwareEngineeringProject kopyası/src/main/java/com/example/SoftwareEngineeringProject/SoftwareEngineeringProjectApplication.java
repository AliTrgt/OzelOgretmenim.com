package com.example.SoftwareEngineeringProject;

import com.example.SoftwareEngineeringProject.Entity.Role;
import com.example.SoftwareEngineeringProject.Entity.Student;
import com.example.SoftwareEngineeringProject.Entity.Tutor;
import com.example.SoftwareEngineeringProject.Entity.User;
import com.example.SoftwareEngineeringProject.Repository.StudentRepository;
import com.example.SoftwareEngineeringProject.Repository.TutorRepository;
import com.example.SoftwareEngineeringProject.Repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.time.LocalDateTime;
import java.util.Set;

@SpringBootApplication
public class SoftwareEngineeringProjectApplication implements CommandLineRunner{


	private final TutorRepository tutorRepository;
	private final StudentRepository studentRepository;

	public SoftwareEngineeringProjectApplication(TutorRepository tutorRepository, StudentRepository studentRepository, UserRepository userRepository, BCryptPasswordEncoder passwordEncoder) {
		this.tutorRepository = tutorRepository;
		this.studentRepository = studentRepository;
		this.userRepository = userRepository;
		this.passwordEncoder = passwordEncoder;
	}

	public static void main(String[] args) {
		SpringApplication.run(SoftwareEngineeringProjectApplication.class, args);
	}


	@Override
	public void run(String... args) throws Exception {
		createStudent();
	}

	private final UserRepository userRepository;
	private final BCryptPasswordEncoder passwordEncoder;

	public void createTutor(){
		User user=User.builder()
				.username("yyazici")
				.password(passwordEncoder.encode("6161"))
				.authorities(Set.of(Role.ROLE_TUTOR))
				.isCredentialsNonExpired(true)
				.accountNonLocked(true)
				.accountNonExpired(true)
				.isEnabled(true)
				.build();
		Tutor tutor=Tutor.builder()
				.firstName("yusuf")
				.lastName("yazici")
				.subject("art")
				.image("image23")
				.telephoneNumber("5422314354")
				.email("yyazici@pau.edu.tr")
				.gender("male")
				.description("desc22")
				.user(user)
				.city("trabzon")
				.registerDate(LocalDateTime.now())
				.build();
		tutorRepository.save(tutor);
	}
	public void createStudent(){
		User user=User.builder()
				.username("okivrak")
				.password(passwordEncoder.encode("6161"))
				.authorities(Set.of(Role.ROLE_STUDENT))
				.build();
		Student student=Student.builder()
				.firstName("onur")
				.lastName("kivrak")
				.user(user)
				.build();
		studentRepository.save(student);

	}
	public void CreateDummyData(){
		User user = User.builder()
				.username("lan")
				.password(passwordEncoder.encode("calis"))
				.authorities(Set.of(Role.ROLE_TUTOR))
				.isEnabled(true)
				.accountNonLocked(true)
				.isCredentialsNonExpired(true)
				.accountNonExpired(true)
				.build();
		Tutor tutor = Tutor.builder()
				.firstName("hadi")
				.lastName("artik")
				.user(user)
				.build();
		tutorRepository.save(tutor);
	}
	public void deleteStudent(int deger){
		studentRepository.deleteById(deger);
	}
	public void deleteTutor(int deger){
		tutorRepository.deleteById(deger);
	}
}
