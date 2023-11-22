package com.hto.admin.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.Date;

@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class PermissionDTO extends BaseDTO {
    private String title;
    private String code;
    private String description;


    public PermissionDTO(long id, String title, String code, String description
                         ,String status ) {
        this.id = id;
        this.title = title;
        this.code = code;
        this.description = description;
        this.status = status;
    }
}
