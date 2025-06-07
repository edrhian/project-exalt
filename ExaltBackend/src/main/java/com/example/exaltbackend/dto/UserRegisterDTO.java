package com.example.exaltbackend.dto;

public record UserRegisterDTO(String role, String fullName, String dni, String phoneNumber, String email, String password, String password2, String patientName, String patientDni, String hospital) {
}