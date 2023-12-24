package com.hto.admin.service.impl;

import com.hto.admin.service.CloudinaryService;
import com.hto.admin.service.FileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class FileServiceImpl implements FileService {

    @Autowired
    private CloudinaryService cloudinaryService;

    @Override
    public String saveImageToCloudinary(MultipartFile file) {
        return cloudinaryService.uploadFile(file);
    }
}
