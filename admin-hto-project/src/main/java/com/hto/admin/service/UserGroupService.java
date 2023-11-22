package com.hto.admin.service;

import java.util.List;

public interface UserGroupService {
    public void save(List<Long> groupIds , long userId);

    public void update(List<Long> removed, List<Long> added, long userId);

    public void delete(long userId, long groupId);


}
