package com.hto.admin.controller;

import com.hto.admin.consts.Consts;
import com.hto.admin.service.FileService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping(Consts.PREFIX_ADMIN + "/file")
public class FileController {

    @Autowired
    private FileService fileService;

    @Operation(summary = "Upload a file")
    @PostMapping(value = "/upload", consumes = "multipart/form-data")
    public ResponseEntity<String> upload(
            @RequestBody MultipartFile file) {

        return new ResponseEntity<>(fileService.saveImageToCloudinary(file), HttpStatus.ACCEPTED);
    }
}
