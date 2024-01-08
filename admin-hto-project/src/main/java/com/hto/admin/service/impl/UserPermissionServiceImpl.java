package com.hto.admin.service.impl;

import com.hto.admin.dto.PermissionDTO;
import com.hto.admin.entity.UserPermissionEntity;
import com.hto.admin.repository.UserPermissionRepository;
import com.hto.admin.service.UserPermissionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserPermissionServiceImpl implements UserPermissionService {

    @Autowired
    private UserPermissionRepository repository;


    @Override
    public List<UserPermissionEntity> getByUserIdAndPermissionId(long userId, long permissionId) {
        return null;
    }

    @Override
    public void save(List<PermissionDTO> addedPermission, long userId) {

        addedPermission.forEach(el -> {
            UserPermissionEntity entity = new UserPermissionEntity();
            entity.setUserId(userId);
            entity.setPermissionId(el.getId());

            repository.save(entity);
        });

    }

    @Override
    public void update(List<PermissionDTO> removed, List<PermissionDTO> added, long userId) {

        removed.forEach(removePermission -> {
            List<UserPermissionEntity> removeEntity = repository.findAllByUserIdAndPermissionId(userId, removePermission.getId());

            repository.deleteAll(removeEntity);

        });

        added.forEach(addPermission -> {
            UserPermissionEntity entity = new UserPermissionEntity();
            entity.setUserId(userId);
            entity.setPermissionId(addPermission.getId());

            repository.save(entity);
        });
    }

    @Override
    public void delete(long userId, long permissionId) {
        List<UserPermissionEntity> userPermissionEntities = repository.findAllByUserIdAndPermissionId(userId, permissionId);

        repository.deleteAll(userPermissionEntities);
    }
}
