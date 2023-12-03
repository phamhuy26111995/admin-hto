package com.hto.admin.controller;

import com.hto.admin.dto.LoginDto;
import com.hto.admin.entity.UserEntity;
import com.hto.admin.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/login")
public class LoginController {

    @Autowired
    private UserService userService;

    @Autowired
    private final AuthenticationManager authenticationManager ;

    public LoginController(AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;
    }


    @PostMapping("/authenticate")
    public String authenticate(@RequestBody LoginDto loginDto) {
        return userService.authenticate(loginDto);
    }

    @GetMapping("/user-info")
    public UserEntity getUserLoginInfo(){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        return userService.findUserByUsername(auth.getPrincipal().toString()).orElse(null);
    }

}
