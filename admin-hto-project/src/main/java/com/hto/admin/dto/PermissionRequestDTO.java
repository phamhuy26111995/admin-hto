package com.hto.admin.dto;

import lombok.Data;

@Data
public class PermissionRequestDTO {
    private long id;
    private String title;
    private String description;
    private String code;
    private String status;
}
