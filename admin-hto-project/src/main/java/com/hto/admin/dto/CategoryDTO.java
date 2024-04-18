package com.hto.admin.dto;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.Date;

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
public class CategoryDTO extends BaseDTO {
    private String title;
    private String image;
    private Date createdAt;
    private long createdBy;
    private Date updatedAt;
    private long updatedBy;
    private boolean deleted;
    private String status;
    private String createByUserName;

    // Constructor with all fields
    public CategoryDTO(long id, String title, String image, Date createdAt, long createdBy,
                       Date updatedAt, long updatedBy, boolean deleted,
                       String status, String createByUserName) {
        super.id = id;
        this.title = title;
        this.image = image;
        this.createdAt = createdAt;
        this.createdBy = createdBy;
        this.updatedAt = updatedAt;
        this.updatedBy = updatedBy;
        this.deleted = deleted;
        this.status = status;
        this.createByUserName = createByUserName;
    }
}

