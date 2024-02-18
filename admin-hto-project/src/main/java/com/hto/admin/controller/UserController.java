package com.hto.admin.controller;

import com.hto.admin.consts.Consts;
import com.hto.admin.dto.UserDTO;
import com.hto.admin.dto.UserRequestDTO;
import com.hto.admin.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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
        return new ResponseEntity<>(userService.getUserById(id), HttpStatus.OK);
    }

    @PostMapping("/get-by-filter")
    public ResponseEntity<List<UserDTO>> getByFilter(@RequestBody UserRequestDTO requestDTO) {

        return new ResponseEntity<>(userService.getUserByFilter(requestDTO), HttpStatus.OK);
    }

    @GetMapping("/get-by-username/{username}")
    public UserDTO getByUsername(@PathVariable String username) {
        return userService.getUserByUserName(username);
    }

    @PostMapping(value = "/create", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<Long> createUser(@RequestPart("userRequestDTO") UserRequestDTO userRequestDTO, MultipartFile image) {

        return new ResponseEntity<>(userService.createUser(userRequestDTO, image), HttpStatus.CREATED);
    }

    @PutMapping(value = "/update", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<Long> updateUser(@RequestPart("userRequestDTO") UserRequestDTO userRequestDTO, MultipartFile newImage) {

        return new ResponseEntity<>(userService.updateUser(userRequestDTO, newImage), HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
