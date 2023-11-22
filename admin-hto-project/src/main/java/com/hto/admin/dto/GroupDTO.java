package com.hto.admin.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@NoArgsConstructor
public class GroupDTO extends BaseDTO{
    private String title;
    private List<PermissionDTO> permissionsInGroup;

    public GroupDTO(long id,String title) {
        this.id = id;
        this.title = title;
    }
}
