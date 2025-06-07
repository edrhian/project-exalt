package com.example.exaltbackend.controllers;

import com.example.exaltbackend.bean.UserAdmin;
import com.example.exaltbackend.dto.LoginRequest;
import com.example.exaltbackend.dto.LoginResponse;
import com.example.exaltbackend.dto.UserRegisterDTO;
import com.example.exaltbackend.security.JwtTokenProvider;
import com.example.exaltbackend.service.UserAdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthController {
    @Autowired
    private UserAdminService userAdminService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    public AuthController(UserAdminService userAdminService) {
        this.userAdminService = userAdminService;
    }

    @PostMapping("/auth/register")
    public UserAdmin saveAdmin(@RequestBody UserRegisterDTO userRegisterDTO){
        return this.userAdminService.save(userRegisterDTO);
    }

    @PostMapping("/auth/login")
    public LoginResponse loginAdmin(@RequestBody LoginRequest loginDTO){
        Authentication authDTO = new UsernamePasswordAuthenticationToken(loginDTO.username(), loginDTO.password());

        Authentication authentication = this.authenticationManager.authenticate(authDTO);
        UserAdmin userAdmin = (UserAdmin) authentication.getPrincipal();

        String token = this.jwtTokenProvider.generateTokenAdministrator(authentication);

        return new LoginResponse(userAdmin.getId(), userAdmin.getEmail(), userAdmin.getPassword(), userAdmin.getUserPatients(), token);

    }
}
