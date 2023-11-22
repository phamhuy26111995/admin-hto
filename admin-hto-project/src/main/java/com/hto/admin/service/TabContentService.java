package com.hto.admin.service;

import com.hto.admin.dto.TabContentDTO;
import com.hto.admin.dto.TabContentRequestDTO;

import java.util.List;

public interface TabContentService {
    List<TabContentDTO> getTabContentByProductTab(long productTabId);

    List<TabContentDTO> save(List<TabContentRequestDTO> requestDTOS, long productTabId);

    List<TabContentDTO> update(List<Long> removedContents , List<TabContentRequestDTO> addedContents,List<TabContentRequestDTO> editContents, long productTabId);

     void delete(List<Long> ids);
}
