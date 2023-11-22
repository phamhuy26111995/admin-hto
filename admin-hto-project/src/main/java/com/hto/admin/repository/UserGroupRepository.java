package com.hto.admin.repository;

import com.hto.admin.entity.UserGroupEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserGroupRepository extends JpaRepository<UserGroupEntity, Long> {
    List<UserGroupEntity> findAllByUserIdAndAndGroupId(long userId, long groupId);
}
