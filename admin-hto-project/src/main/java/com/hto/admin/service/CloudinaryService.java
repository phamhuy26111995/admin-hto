package com.hto.admin.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import jakarta.annotation.PostConstruct;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.Map;

@Service
@Log4j2
public class CloudinaryService {
    private Cloudinary cloudinary;
    @Value("${cloudinary.cloud-name}")
    private String cloudName;
    @Value("${cloudinary.api-key}")
    private String apiKey;
    @Value("${cloudinary.api-secret}")
    private String apiSecret;

    @PostConstruct
    public void initial() {
        Map config = new HashMap();
        config.put("cloud_name", cloudName);
        config.put("api_key", apiKey);
        config.put("api_secret", apiSecret);
        this.cloudinary = new Cloudinary(config);
    }

    public String uploadFile(MultipartFile file) {
        try {
            String filenameWithoutExtension = file.getOriginalFilename().substring(0, file.getOriginalFilename().lastIndexOf("."));
            return cloudinary.uploader()
                    .upload(file.getBytes(), ObjectUtils.asMap("public_id", filenameWithoutExtension.trim()))
                    .get("url").toString();
        } catch (Exception e) {
            log.info(e.getMessage());
            return null;
        }
    }
}
