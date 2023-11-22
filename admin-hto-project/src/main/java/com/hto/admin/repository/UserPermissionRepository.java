package com.hto.admin.repository;

import com.hto.admin.entity.UserPermissionEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserPermissionRepository extends JpaRepository<UserPermissionEntity, Long> {
    List<UserPermissionEntity> findAllByUserIdAndPermissionId(long userId, long permissionId);
}
