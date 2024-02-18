package com.hto.admin.controller.public_api;


import com.hto.admin.consts.Consts;
import com.hto.admin.dto.UserRequestDTO;
import com.hto.admin.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping(Consts.PREFIX_PUBLIC + "/user-profile")
public class ProfileController {

    @Autowired
    private UserService userService;


    @PutMapping(value = "/update", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity changeProfileInfo(@RequestPart("userRequestDTO") UserRequestDTO userRequestDTO, MultipartFile newImage) {

        userService.updateProfile(userRequestDTO, newImage);

        return new ResponseEntity(HttpStatus.OK);
    }

}
