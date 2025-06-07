package com.example.exaltbackend.security;

import com.example.exaltbackend.bean.UserAdmin;
import com.example.exaltbackend.service.UserAdminService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

/*
Permite que Spring Security sepa cómo extraer el usuario de base de datos
para realizar la autenticación
 */
@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    Logger log = LoggerFactory.getLogger(UserDetailsServiceImpl.class);

    private final UserAdminService userAdminService;

    public UserDetailsServiceImpl(UserAdminService userAdminService) {
        this.userAdminService = userAdminService;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        log.debug("loadUserByUsername {}", username);

        UserAdmin userAdmin = this.userAdminService.findByUsername(username)
                .orElse(null);

        return userAdmin;

    }
}
