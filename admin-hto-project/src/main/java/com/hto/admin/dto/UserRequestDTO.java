package com.hto.admin.dto;

import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
public class UserRequestDTO extends BaseDTO {
    private String name;
    private String code;
    private String username;
    private String image;
    private String email;
    private String phone;
    private Date birthday;
    private String password;
    //    private List<Long> addedGroup = new ArrayList<>();
//    private List<Long> removedGroup = new ArrayList<>();
    private List<PermissionDTO> addedPermission = new ArrayList<>();
    private List<PermissionDTO> removedPermission = new ArrayList<>();
}
