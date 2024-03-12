package com.hto.admin.controller;

import com.hto.admin.consts.Consts;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileOutputStream;
import java.io.IOException;

@RestController
@RequestMapping(Consts.PREFIX_PUBLIC + "/file")
public class FileController {

//    @Autowired
//    private FileService fileService;
//
//    @Operation(summary = "Upload a file")
//    @PostMapping(value = "/upload", consumes = "multipart/form-data")
//    public ResponseEntity<String> upload(
//            @RequestBody MultipartFile file) {
//
//        return new ResponseEntity<>(fileService.saveImageToCloudinary(file), HttpStatus.ACCEPTED);
//    }

//    private final GoogleDriveService googleDriveService;
//
//    public FileController(GoogleDriveService googleDriveService) {
//        this.googleDriveService = googleDriveService;
//    }

    @PostMapping("/upload")
    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile multipartFile) {
//        try {
//            java.io.File file = convertMultiPartToFile(multipartFile);
//            File uploadedFile = googleDriveService.uploadFile(file, multipartFile.getContentType());
//            return ResponseEntity.ok("File uploaded successfully: " + uploadedFile.getId());
//        } catch (Exception e) {
//            return ResponseEntity.badRequest().body("File upload failed: " + e.getMessage());
//        }
        return new ResponseEntity<>("upload file", HttpStatus.OK);
    }

    private java.io.File convertMultiPartToFile(MultipartFile file) throws IOException {
        java.io.File convFile = new java.io.File(file.getOriginalFilename());
        FileOutputStream fos = new FileOutputStream(convFile);
        fos.write(file.getBytes());
        fos.close();
        return convFile;
    }
}
