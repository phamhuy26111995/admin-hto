package com.hto.admin.service;

import com.hto.admin.dto.PermissionDTO;
import com.hto.admin.dto.PermissionRequestDTO;
import com.hto.admin.entity.PermissionEntity;

import java.util.List;

public interface PermissionService {
    public List<PermissionDTO> getAllPermission();

    public List<PermissionDTO> getPermissionByUser(long userId);


    public long createPermission(PermissionRequestDTO permissionRequestDTO);

    public long updatePermission(PermissionRequestDTO permissionRequestDTO);

    public void deletePermission(long id);
}
