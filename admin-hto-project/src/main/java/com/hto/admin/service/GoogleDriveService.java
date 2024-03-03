package com.hto.admin.service;

import com.google.api.client.http.FileContent;
import com.google.api.services.drive.Drive;
import com.google.api.services.drive.model.File;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public class GoogleDriveServiceImpl {
    private final Drive driveService;

    // Constructor to inject a preconfigured Drive instance
    public GoogleDriveServiceImpl(Drive driveService) {
        this.driveService = driveService;
    }

    public File uploadFile(java.io.File filePath, String mimeType) throws IOException {
        File fileMetadata = new File();
        fileMetadata.setName(filePath.getName());

        FileContent mediaContent = new FileContent(mimeType, filePath);
        File file = driveService.files().create(fileMetadata, mediaContent)
                .setFields("id")
                .execute();
        return file;
    }
}
