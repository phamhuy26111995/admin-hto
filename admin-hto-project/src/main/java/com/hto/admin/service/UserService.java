package com.hto.admin.service;

import com.hto.admin.dto.UserDTO;
import com.hto.admin.dto.UserRequestDTO;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

public interface UserService {
    public List<UserDTO> getAllUser();

    public UserDTO getUserById(long id);

    public long createUser(UserRequestDTO requestDTO);

    public long updateUser(UserRequestDTO requestDTO);

    public void deleteUser(long id);

}
