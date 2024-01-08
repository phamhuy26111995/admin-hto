package com.hto.admin.service;

import com.hto.admin.dto.LoginDto;
import com.hto.admin.dto.UserDTO;
import com.hto.admin.dto.UserRequestDTO;
import com.hto.admin.entity.UserEntity;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

public interface UserService {
    public List<UserDTO> getAllUser();

    public UserDTO getUserById(long id);

    public UserDTO getUserAdmin();


    public List<UserDTO> getUserByFilter(UserRequestDTO requestDTO);

    public long createUser(UserRequestDTO requestDTO, MultipartFile userImage);

    public long updateUser(UserRequestDTO requestDTO, MultipartFile newImage);

    public void deleteUser(long id);

    String authenticate(LoginDto loginDto);

    String fakeLogin(LoginDto loginDto);

    Optional<UserEntity> findUserByUsername(String username);
}
