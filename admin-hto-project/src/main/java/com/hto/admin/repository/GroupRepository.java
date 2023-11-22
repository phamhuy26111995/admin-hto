package com.hto.admin.repository;

import com.hto.admin.dto.GroupDTO;
import com.hto.admin.entity.GroupEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GroupRepository extends JpaRepository<GroupEntity, Long> {


    @Query("SELECT new com.hto.admin.dto.GroupDTO(g.id, g.title) " +
            " FROM UserGroupEntity ug JOIN UserEntity u " +
            " ON ug.userId = u.id " +
            " JOIN GroupEntity g ON ug.groupId = g.id WHERE u.id = :userId AND g.status = 'ACTIVE' and g.isDeleted = FALSE")
    public List<GroupDTO> getGroupByUser(@Param("userId") long userId);
}
