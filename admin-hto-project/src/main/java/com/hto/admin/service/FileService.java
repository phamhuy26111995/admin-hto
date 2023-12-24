package com.hto.admin.service;

import org.springframework.web.multipart.MultipartFile;

public interface FileService {
    String saveImageToCloudinary(MultipartFile file);
}
