package com.hto.admin.dto;

import lombok.Data;

@Data
public class CategoryRequestDTO {

    private long id;

    private String title;

    private String image;

    private String status;
}
