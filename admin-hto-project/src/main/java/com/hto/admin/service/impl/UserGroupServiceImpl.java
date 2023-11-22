package com.hto.admin.service.impl;

import com.hto.admin.entity.UserGroupEntity;
import com.hto.admin.entity.UserPermissionEntity;
import com.hto.admin.repository.UserGroupRepository;
import com.hto.admin.service.UserGroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserGroupServiceImpl implements UserGroupService {

    @Autowired
    private UserGroupRepository userGroupRepository;

    @Override
    public void save(List<Long> groupIds, long userId) {

        groupIds.forEach(groupId -> {
            UserGroupEntity entity = new UserGroupEntity();
            entity.setGroupId(groupId);
            entity.setUserId(userId);
            userGroupRepository.save(entity);
        });
    }

    @Override
    public void update(List<Long> removed, List<Long> added, long userId) {
        removed.forEach(removeGroup -> {
            List<UserGroupEntity> removeEntity = userGroupRepository.findAllByUserIdAndAndGroupId(removeGroup, userId);

            userGroupRepository.deleteAll(removeEntity);

        });

        added.forEach(addGroup -> {
            UserGroupEntity entity = new UserGroupEntity();
            entity.setUserId(userId);
            entity.setGroupId(addGroup);

            userGroupRepository.save(entity);
        });
    }

    @Override
    public void delete(long userId, long groupId) {
        List<UserGroupEntity> userGroupEntities = userGroupRepository.findAllByUserIdAndAndGroupId(userId,groupId);

        userGroupRepository.deleteAll(userGroupEntities);

    }
}
