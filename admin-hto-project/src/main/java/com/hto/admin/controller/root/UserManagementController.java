package com.hto.admin.controller.root;


import com.hto.admin.consts.Consts;
import com.hto.admin.dto.LoginDto;
import com.hto.admin.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(Consts.PREFIX_ROOT + "/user-management")
public class UserManagementController {

    @Autowired
    private UserService userService;


    @PutMapping("/change-root-password")
    public ResponseEntity changeRootPassword(@RequestBody LoginDto loginDto) {

        userService.changePassword(loginDto);


        return new ResponseEntity(HttpStatus.ACCEPTED);
    }

}
