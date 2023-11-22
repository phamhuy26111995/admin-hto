package com.hto.admin.controller;

import com.hto.admin.consts.Consts;
import com.hto.admin.dto.GroupDTO;
import com.hto.admin.dto.GroupRequestDTO;
import com.hto.admin.dto.UserDTO;
import com.hto.admin.service.GroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(Consts.PREFIX_ADMIN + "/group")
public class GroupController {

    @Autowired
    private GroupService groupService;


    @GetMapping("/get-all")
    public ResponseEntity<List<GroupDTO>> getAllGroup() {

        return new ResponseEntity<>(groupService.getAllGroup(), HttpStatus.OK);
    }

    @GetMapping("{id}")
    public ResponseEntity<GroupDTO> getAllGroup(@PathVariable long id) {

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/create")
    public ResponseEntity<Long> createGroup(@RequestBody GroupRequestDTO groupRequestDTO) {

        return new ResponseEntity<>(groupService.createGroup(groupRequestDTO), HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<Long> updateGroup(@RequestBody GroupRequestDTO groupRequestDTO) {

        return new ResponseEntity<>(groupService.updateGroup(groupRequestDTO), HttpStatus.OK);
    }


}
