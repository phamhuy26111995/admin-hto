package com.hto.admin.service;

import com.hto.admin.dto.GroupDTO;
import com.hto.admin.dto.GroupRequestDTO;

import java.util.List;

public interface GroupService {

    public List<GroupDTO> getAllGroup();


    public List<GroupDTO> getGroupByUser(long userId);

    public long createGroup(GroupRequestDTO requestDTO);

    public long updateGroup(GroupRequestDTO requestDTO);

    public void deleteGroup(long groupId);
}
