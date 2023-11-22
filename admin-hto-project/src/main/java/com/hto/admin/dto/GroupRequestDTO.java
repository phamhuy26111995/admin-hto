package com.hto.admin.dto;

import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.ArrayList;
import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
public class GroupRequestDTO extends BaseDTO{
    private String title;
    private List<Long> addedPermission = new ArrayList<>();
    private List<Long> removedPermission = new ArrayList<>();
}
