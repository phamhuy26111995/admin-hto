package com.hto.admin.service;

import com.hto.admin.dto.PermissionDTO;
import com.hto.admin.entity.GroupPermissionEntity;

import java.util.List;

public interface GroupPermissionService {
    public List<GroupPermissionEntity> getByGroupIdAndPermissionId(long groupId, long permissionId);
    public List<GroupPermissionEntity> getByGroupId(long groupId);

    public List<PermissionDTO> getPermissionInGroup(long groupId);

    public void save(List<Long> addedPermission , long groupId);

    public void update(List<Long> removed, List<Long> added, long groupId);

    public void delete(long groupId, long permissionId);

    public void deletePermissionsBelongGroup(long groupId);

}
