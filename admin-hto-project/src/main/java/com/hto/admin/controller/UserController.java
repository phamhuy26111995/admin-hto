package com.hto.admin.controller;

import com.hto.admin.consts.Consts;
import com.hto.admin.dto.UserDTO;
import com.hto.admin.dto.UserRequestDTO;
import com.hto.admin.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(Consts.PREFIX_ADMIN + "/user")
public class UserController {
    @Autowired
    private UserService userService;


    @GetMapping("/get-all")
    public ResponseEntity<List<UserDTO>> getAllUser() {

        return new ResponseEntity<>(userService.getAllUser(), HttpStatus.OK);
    }

    @GetMapping("{id}")
    public ResponseEntity<UserDTO> getById(@PathVariable long id) {
        return new ResponseEntity<>(userService.getUserById(id) , HttpStatus.OK);
    }

    @PostMapping("/create")
    public ResponseEntity<Long> createUser(@RequestBody UserRequestDTO userRequestDTO) {

        return new ResponseEntity<>(userService.createUser(userRequestDTO),HttpStatus.CREATED);
    }
}
