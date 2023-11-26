package com.hto.admin.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import java.util.Date;


@Data
public class BaseDTO {

    protected long id;

    protected Date createdAt;

    protected long createdBy;


    protected Date updatedAt;



    protected long updatedBy;

    @JsonIgnore
    protected boolean isDeleted = false;

    protected String status = "ACTIVE";
}
