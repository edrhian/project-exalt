package com.example.exaltbackend.controllers;

import com.example.exaltbackend.bean.UserPatient;
import com.example.exaltbackend.repository.UserPatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/userPatient")
public class UserPatientController {
    @Autowired
    private UserPatientRepository userPatientRepository;

    @GetMapping("/{id}")
    public ResponseEntity<UserPatient> getUserPatient(@PathVariable Long id){
        return ResponseEntity.ok(userPatientRepository.findById(id).get());
    }
}
