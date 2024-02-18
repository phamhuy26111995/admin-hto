package com.hto.admin.controller;

import com.hto.admin.consts.Consts;
import com.hto.admin.dto.PermissionDTO;
import com.hto.admin.dto.PermissionRequestDTO;
import com.hto.admin.service.PermissionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(Consts.PREFIX_ROOT + "/permission")
public class PermissionController {

    @Autowired
    private PermissionService permissionService;


    @GetMapping("/get-all")
    public ResponseEntity<List<PermissionDTO>> getAllPermission() {

        return new ResponseEntity<>(permissionService.getAllPermission(), HttpStatus.OK);
    }


    @PostMapping("/create")
    public ResponseEntity<Long> createPermission(@RequestBody PermissionRequestDTO permissionRequestDTO) {

        return new ResponseEntity<>(permissionService.createPermission(permissionRequestDTO), HttpStatus.CREATED);
    }


    @PutMapping("/update")
    public ResponseEntity<Long> updatePermission(@RequestBody PermissionRequestDTO permissionRequestDTO) {

        return new ResponseEntity<>(permissionService.updatePermission(permissionRequestDTO), HttpStatus.OK);
    }

    @DeleteMapping("/delete")
    public ResponseEntity deletePermission(@RequestParam("id") long id) {

        permissionService.deletePermission(id);

        return new ResponseEntity(HttpStatus.ACCEPTED);
    }

}
