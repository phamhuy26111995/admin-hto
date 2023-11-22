package com.hto.admin.repository;

import com.hto.admin.dto.UserDTO;
import com.hto.admin.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long> {

    @Query("SELECT new com.hto.admin.dto.UserDTO(u.id" +
            ", u.name" +
            ", u.username" +
            ", u.image" +
            ", u.email" +
            ", u.phone" +
            ", u.birthday " +
            ", u.createdAt" +
            ", u.createdBy" +
            ", u.updatedAt" +
            ", u.updatedBy" +
            ", u.status) " +
            "FROM UserEntity u")
    List<UserDTO> getAllUser();
}
