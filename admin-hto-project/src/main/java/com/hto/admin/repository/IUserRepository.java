package com.hto.admin.repository;

import com.hto.admin.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface IUserRepository extends JpaRepository<UserEntity,Long> {

    Boolean existsByEmail(String email);
    Optional<UserEntity> findByUsername(String username);



}


