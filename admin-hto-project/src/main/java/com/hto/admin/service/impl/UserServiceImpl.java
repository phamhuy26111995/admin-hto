package com.hto.admin.service.impl;

import com.hto.admin.dto.UserDTO;
import com.hto.admin.dto.UserRequestDTO;
import com.hto.admin.entity.UserEntity;
import com.hto.admin.repository.UserRepository;
import com.hto.admin.service.PermissionService;
import com.hto.admin.service.UserGroupService;
import com.hto.admin.service.UserPermissionService;
import com.hto.admin.service.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class UserServiceImpl implements UserService {
    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PermissionService permissionService;

    @Autowired
    private UserPermissionService userPermissionService;
    @Autowired
    private UserGroupService userGroupService;

    @Override
    public List<UserDTO> getAllUser() {
        return userRepository.getAllUser();
    }

    @Override
    public UserDTO getUserById(long id) {
        UserEntity userEntity = userRepository.findById(id).isPresent() ? userRepository.findById(id).get() : null;

        if(userEntity == null) return new UserDTO();

        UserDTO dto = new UserDTO();

        modelMapper.map(userEntity, dto);

        dto.setUserPermission(permissionService.getPermissionByUser(userEntity.getId()));

        return dto;
    }

    @Override
    public long createUser(UserRequestDTO requestDTO) {
        UserEntity entity = new UserEntity();
        modelMapper.map(requestDTO, entity);
        userPermissionService.save(requestDTO.getAddedPermission(), requestDTO.getId());
        userGroupService.save(requestDTO.getAddedGroup(), requestDTO.getId());
        UserEntity savedEntity = userRepository.save(entity);

        return savedEntity.getId();
    }

    @Override
    public long updateUser(UserRequestDTO requestDTO) {
        Optional<UserEntity> optional = userRepository.findById(requestDTO.getId());

        if(optional.isEmpty()) return 0;

        UserEntity entity = optional.get();

        modelMapper.map(requestDTO, entity);

        userPermissionService.update(requestDTO.getRemovedPermission()
                ,requestDTO.getAddedPermission()
                , entity.getId());
        userGroupService.update(requestDTO.getRemovedGroup(), requestDTO.getAddedGroup(), entity.getId());

        return userRepository.save(entity).getId();
    }

    @Override
    public void deleteUser(long id) {
        Optional<UserEntity> optional = userRepository.findById(id);

        optional.ifPresent(userEntity -> {
            userEntity.setDeleted(true);
            userRepository.save(userEntity);
        });
    }
}
