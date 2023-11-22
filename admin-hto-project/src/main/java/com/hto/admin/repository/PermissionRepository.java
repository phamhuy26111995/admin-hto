package com.hto.admin.repository;

import com.hto.admin.dto.PermissionDTO;
import com.hto.admin.entity.PermissionEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PermissionRepository extends JpaRepository<PermissionEntity, Long> {


    @Query("SELECT new com.hto.admin.dto.PermissionDTO(p.id, p.title, p.code,p.description,p.status) " +
            " FROM UserPermissionEntity up JOIN UserEntity u " +
            " ON up.userId = u.id " +
            " JOIN PermissionEntity p ON up.permissionId = p.id WHERE u.id = :userId AND p.status = 'ACTIVE' and p.isDeleted = FALSE")
    List<PermissionDTO> getPermissionByUser(@Param("userId") long userId);

}
