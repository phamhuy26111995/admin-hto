package com.hto.admin.dto;

import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class UserPermissionRequestDTO extends BaseDTO{
    private long userId;
    private long permissionId;
}
