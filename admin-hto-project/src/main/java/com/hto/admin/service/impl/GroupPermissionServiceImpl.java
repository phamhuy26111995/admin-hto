package com.hto.admin.service.impl;

import com.hto.admin.dto.PermissionDTO;
import com.hto.admin.entity.GroupPermissionEntity;
import com.hto.admin.entity.UserPermissionEntity;
import com.hto.admin.repository.GroupPermissionRepository;
import com.hto.admin.service.GroupPermissionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GroupPermissionServiceImpl implements GroupPermissionService {

    @Autowired
    private GroupPermissionRepository groupPermissionRepository;

    @Override
    public List<GroupPermissionEntity> getByGroupIdAndPermissionId(long groupId, long permissionId) {
        return groupPermissionRepository.findAllByGroupIdAndPermissionId(groupId, permissionId);
    }


    @Override
    public List<GroupPermissionEntity> getByGroupId(long groupId) {
        return groupPermissionRepository.findAllByGroupId(groupId);
    }

    @Override
    public List<PermissionDTO> getPermissionInGroup(long groupId) {
        return groupPermissionRepository.getPermissionInGroup(groupId);
    }

    @Override
    public void save(List<Long> addedPermission, long groupId) {
        addedPermission.forEach(el -> {
            GroupPermissionEntity entity = new GroupPermissionEntity();
            entity.setGroupId(groupId);
            entity.setPermissionId(el);

            groupPermissionRepository.save(entity);
        });
    }

    @Override
    public void update(List<Long> removed, List<Long> added, long groupId) {
        removed.forEach(removePermission -> {
            List<GroupPermissionEntity> removeEntity = groupPermissionRepository.findAllByGroupIdAndPermissionId(removePermission, groupId);

            groupPermissionRepository.deleteAll(removeEntity);

        });

        added.forEach(addPermissionId -> {
            GroupPermissionEntity entity = new GroupPermissionEntity();
            entity.setGroupId(groupId);
            entity.setPermissionId(addPermissionId);

            groupPermissionRepository.save(entity);
        });
    }

    @Override
    public void delete(long groupId, long permissionId) {

    }

    @Override
    public void deletePermissionsBelongGroup(long groupId) {
        List<GroupPermissionEntity> entities = groupPermissionRepository.findAllByGroupId(groupId);
        groupPermissionRepository.deleteAll(entities);
    }
}
