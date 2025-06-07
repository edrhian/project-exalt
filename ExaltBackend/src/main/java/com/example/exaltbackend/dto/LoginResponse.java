package com.example.exaltbackend.dto;

import com.example.exaltbackend.bean.UserPatient;

import java.util.List;

public record LoginResponse(Long id, String email, String password, List<UserPatient> userPatients, String token) {
}
