package com.hto.admin.repository;

import com.hto.admin.dto.UserDTO;
import com.hto.admin.dto.UserRequestDTO;

import java.util.List;

public interface UserRepositoryCustom {
    List<UserDTO> getUserByFilter(UserRequestDTO requestDTO);
}
