package com.hto.admin.service;

import com.hto.admin.dto.PermissionDTO;
import com.hto.admin.entity.UserPermissionEntity;

import java.util.List;

public interface UserPermissionService {

    public List<UserPermissionEntity> getByUserIdAndPermissionId(long userId, long permissionId);

    public void save(List<PermissionDTO> addedPermission, long userId);

    public void update(List<PermissionDTO> removed, List<PermissionDTO> added, long userId);

    public void delete(long userId, long permissionId);
}
