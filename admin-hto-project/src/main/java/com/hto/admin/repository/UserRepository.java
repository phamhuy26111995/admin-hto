package com.hto.admin.repository;

import com.hto.admin.dto.UserDTO;
import com.hto.admin.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long>, UserRepositoryCustom {

    @Query("SELECT new com.hto.admin.dto.UserDTO(u.id" +
            ", u.name" +
            ", u.code" +
            ", u.username" +
            ", u.image" +
            ", u.email" +
            ", u.phone" +
            ", u.birthday " +
            ", u.createdAt" +
            ", u.createdBy" +
            ", u.updatedAt" +
            ", u.updatedBy" +
            ", u.status" +
            ", u.role) " +
            "FROM UserEntity u")
    List<UserDTO> getAllUser();

    @Query("SELECT new com.hto.admin.dto.UserDTO(u.id" +
            ", u.name" +
            ", u.code" +
            ", u.username" +
            ", u.image" +
            ", u.email" +
            ", u.phone" +
            ", u.birthday " +
            ", u.createdAt" +
            ", u.createdBy" +
            ", u.updatedAt" +
            ", u.updatedBy" +
            ", u.status" +
            ", u.role) " +
            "FROM UserEntity u WHERE u.role != 'ROLE_ADMIN' AND u.status = 'ACTIVE'")
    List<UserDTO> getAllUserNotAdmin();


    @Query("SELECT new com.hto.admin.dto.UserDTO(u.id" +
            ", u.name" +
            ", u.code" +
            ", u.username" +
            ", u.image" +
            ", u.email" +
            ", u.phone" +
            ", u.birthday " +
            ", u.createdAt" +
            ", u.createdBy" +
            ", u.updatedAt" +
            ", u.updatedBy" +
            ", u.status" +
            ", u.role) " +
            "FROM UserEntity u WHERE u.role = 'ROLE_ADMIN' AND u.status = 'ACTIVE' ")
    List<UserDTO> getUserAdmin();

    @Query("SELECT new com.hto.admin.dto.UserDTO(u.id" +
            ", u.name" +
            ", u.code" +
            ", u.username" +
            ", u.image" +
            ", u.email" +
            ", u.phone" +
            ", u.birthday " +
            ", u.createdAt" +
            ", u.createdBy" +
            ", u.updatedAt" +
            ", u.updatedBy" +
            ", u.status" +
            ", u.role) " +
            "FROM UserEntity u WHERE u.username = :username AND u.status = 'ACTIVE' ")
    List<UserDTO> getUserByUserName(@Param("username") String username);

    List<UserEntity> findByRole(String role);
}
