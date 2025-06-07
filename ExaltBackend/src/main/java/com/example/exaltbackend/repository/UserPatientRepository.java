package com.example.exaltbackend.repository;

import com.example.exaltbackend.bean.UserPatient;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserPatientRepository extends JpaRepository<UserPatient, Long> {
}
