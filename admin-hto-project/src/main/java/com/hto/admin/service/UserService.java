package com.hto.admin.service;

import com.hto.admin.dto.LoginDto;
import com.hto.admin.dto.UserDTO;
import com.hto.admin.dto.UserRequestDTO;
import com.hto.admin.entity.UserEntity;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.Optional;

public interface UserService {
    public List<UserDTO> getAllUser();

    public UserDTO getUserById(long id);

    public long createUser(UserRequestDTO requestDTO);

    public long updateUser(UserRequestDTO requestDTO);

    public void deleteUser(long id);

    String authenticate(LoginDto loginDto);

    Optional<UserEntity> findUserByUsername(String username);
}
