package com.hto.admin.service.impl;

import com.hto.admin.dto.GroupDTO;
import com.hto.admin.dto.GroupRequestDTO;
import com.hto.admin.entity.GroupEntity;
import com.hto.admin.entity.GroupPermissionEntity;
import com.hto.admin.repository.GroupRepository;
import com.hto.admin.service.GroupPermissionService;
import com.hto.admin.service.GroupService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicLong;

@Service
public class GroupServiceImpl implements GroupService {

    @Autowired
    private GroupRepository groupRepository;
    @Autowired
    private GroupPermissionService groupPermissionService;
    @Autowired
    private ModelMapper modelMapper;
    @Override
    public List<GroupDTO> getAllGroup() {
        List<GroupEntity> groupEntities = groupRepository.findAll();
        List<GroupDTO> groupDTOS = new ArrayList<>();

        groupEntities.forEach(groupEntity -> {
            GroupDTO dto = new GroupDTO();
            modelMapper.map(groupEntity, dto);
            dto.setPermissionsInGroup(groupPermissionService.getPermissionInGroup(groupEntity.getId()));
            groupDTOS.add(dto);
        });

        return groupDTOS;
    }

    @Override
    public List<GroupDTO> getGroupByUser(long userId) {
        return null;
    }

    @Override
    public long createGroup(GroupRequestDTO requestDTO) {
        GroupEntity entity = new GroupEntity();

        modelMapper.map(requestDTO, entity);

        GroupEntity createdGroup = groupRepository.save(entity);

        groupPermissionService.save(requestDTO.getAddedPermission(), createdGroup.getId() );

        return createdGroup.getId();
    }

    @Override
    public long updateGroup(GroupRequestDTO requestDTO) {
        Optional<GroupEntity> optional = groupRepository.findById(requestDTO.getId());

        AtomicLong updatedGroup = new AtomicLong();

        optional.ifPresent(groupEntity -> {
            modelMapper.map(requestDTO, groupEntity);

            updatedGroup.set(groupRepository.save(groupEntity).getId());

            groupPermissionService.update(requestDTO.getRemovedPermission(), requestDTO.getAddedPermission(), groupEntity.getId());
        });


        return updatedGroup.get();
    }

    @Override
    public void deleteGroup(long groupId) {
        Optional<GroupEntity> optional = groupRepository.findById(groupId);

        optional.ifPresent(groupEntity -> {
            groupEntity.setDeleted(true);
            List<GroupPermissionEntity> groupPermissionEntities = groupPermissionService.getByGroupId(groupEntity.getId());

            groupPermissionService.deletePermissionsBelongGroup(groupId);

            groupRepository.save(groupEntity);
        });

    }
}
