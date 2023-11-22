package com.hto.admin.repository;

import com.hto.admin.dto.PermissionDTO;
import com.hto.admin.entity.GroupPermissionEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface GroupPermissionRepository extends JpaRepository<GroupPermissionEntity, Long> {
    List<GroupPermissionEntity> findAllByGroupIdAndPermissionId(long groupId,long permissionId);
    List<GroupPermissionEntity> findAllByGroupId(long groupId);

    @Query("SELECT new com.hto.admin.dto.PermissionDTO(p.id, p.title,p.code, p.description, p.status) FROM GroupPermissionEntity gp JOIN PermissionEntity p ON gp.permissionId = p.id JOIN GroupEntity g ON gp.groupId = g.id WHERE g.id = :groupId")
    List<PermissionDTO> getPermissionInGroup(@Param("groupId") long groupId);
}
