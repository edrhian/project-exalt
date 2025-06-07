package com.example.exaltbackend.service;

import com.example.exaltbackend.bean.UserAdmin;
import com.example.exaltbackend.bean.UserAuthority;
import com.example.exaltbackend.bean.UserPatient;
import com.example.exaltbackend.dto.UserRegisterDTO;
import com.example.exaltbackend.repository.UserAdminRepository;
import com.example.exaltbackend.repository.UserPatientRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserAdminService {

    private final UserAdminRepository userAdminRepository;

    private final UserPatientRepository userPatientRepository;
    private final PasswordEncoder passwordEncoder;

    public UserAdminService(UserAdminRepository userAdminRepository, UserPatientRepository userPatientRepository, PasswordEncoder passwordEncoder) {
        this.userAdminRepository = userAdminRepository;
        this.userPatientRepository = userPatientRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public Optional<UserAdmin> findByUsername(String username) {
        return this.userAdminRepository.findByUsername(username);
    }

    public UserAdmin save(UserRegisterDTO userDTO) {
        // String role, String fullName, String dni, String phoneNumber, String email, String password, List<UserPatient> userPatients
        UserAdmin userAdmin = new UserAdmin(
                userDTO.role(),
                userDTO.fullName(),
                userDTO.dni(),
                userDTO.phoneNumber(),
                userDTO.email(),
                passwordEncoder.encode(userDTO.password()),
                List.of(),
                List.of(UserAuthority.READ, UserAuthority.WRITE)
        );
        UserPatient userPatient = new UserPatient(userDTO.patientName(), userDTO.patientDni(), userDTO.hospital(), userAdmin, List.of());
        List<UserPatient> listUserPatients = new ArrayList<UserPatient>();
        listUserPatients.add(userPatient);
        userAdmin.setUserPatients(listUserPatients);
        return this.userAdminRepository.save(userAdmin);
    }
}

