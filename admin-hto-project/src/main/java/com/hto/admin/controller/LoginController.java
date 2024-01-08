package com.hto.admin.controller;

import com.hto.admin.consts.Consts;
import com.hto.admin.dto.LoginDto;
import com.hto.admin.dto.UserDTO;
import com.hto.admin.entity.UserEntity;
import com.hto.admin.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(Consts.PREFIX_ADMIN + "/login")
public class LoginController {

    @Autowired
    private final AuthenticationManager authenticationManager;
    @Autowired
    private UserService userService;

    public LoginController(AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;
    }

    @PostMapping("/fake-login")
    public String fakeLogin(@RequestBody LoginDto loginDto) {
        return userService.fakeLogin(loginDto);
    }

    @PostMapping("/get-user-admin")
    public UserDTO getUserAdmin() {
        return userService.getUserAdmin();
    }

    @PostMapping("/authenticate")
    public String authenticate(@RequestBody LoginDto loginDto) {
        return userService.authenticate(loginDto);
    }

    @GetMapping("/user-info")
    public UserEntity getUserLoginInfo() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        return userService.findUserByUsername(auth.getPrincipal().toString()).orElse(null);
    }

}
