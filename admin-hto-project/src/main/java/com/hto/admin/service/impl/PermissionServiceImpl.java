package com.hto.admin.service.impl;

import com.hto.admin.dto.PermissionDTO;
import com.hto.admin.dto.PermissionRequestDTO;
import com.hto.admin.entity.PermissionEntity;
import com.hto.admin.repository.PermissionRepository;
import com.hto.admin.service.PermissionService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class PermissionServiceImpl implements PermissionService {

    @Autowired
    private PermissionRepository permissionRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public List<PermissionDTO> getAllPermission() {
        List<PermissionDTO> dtos = new ArrayList<>();
        List<PermissionEntity> entities = permissionRepository.findAll();

        entities.forEach(el -> {
            PermissionDTO dto = new PermissionDTO();
            modelMapper.map(el, dto);

            dtos.add(dto);
        });
        return dtos;
    }

    @Override
    public List<PermissionDTO> getPermissionByUser(long userId) {
        return permissionRepository.getPermissionByUser(userId);
    }

    @Override
    public long createPermission(PermissionRequestDTO permissionRequestDTO) {
        PermissionEntity entity = new PermissionEntity();
        modelMapper.getConfiguration().isSkipNullEnabled();
        modelMapper.map(permissionRequestDTO, entity);

        PermissionEntity savedEntity =  permissionRepository.save(entity);

        return savedEntity.getId();
    }

    @Override
    public long updatePermission(PermissionRequestDTO permissionRequestDTO) {
        Optional<PermissionEntity> optionalPermission = permissionRepository.findById(permissionRequestDTO.getId());
        optionalPermission.ifPresent(permissionEntity -> {
            modelMapper.map(permissionRequestDTO , permissionEntity);
            permissionRepository.save(permissionEntity);
        });
        return optionalPermission.isPresent() ? optionalPermission.get().getId() : 0;
    }

    @Override
    public void deletePermission(long id) {
        Optional<PermissionEntity> optionalPermission = permissionRepository.findById(id);

        optionalPermission.ifPresent(permissionEntity -> {
            permissionEntity.setDeleted(false);
            permissionRepository.save(permissionEntity);
        });
    }
}
