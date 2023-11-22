package com.hto.admin.service.impl;

import com.hto.admin.dto.TabContentDTO;
import com.hto.admin.dto.TabContentRequestDTO;
import com.hto.admin.entity.TabContentEntity;
import com.hto.admin.repository.TabContentRepository;
import com.hto.admin.service.TabContentService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TabContentServiceImpl implements TabContentService {

    @Autowired
    private TabContentRepository tabContentRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public List<TabContentDTO> getTabContentByProductTab(long productTabId) {
        return tabContentRepository.getTabContentByProductTab(productTabId);
    }

    @Override
    public List<TabContentDTO> save(List<TabContentRequestDTO> requestDTOS, long productTabId) {

        List<TabContentDTO> tabContentDTOS = new ArrayList<>();

        requestDTOS.forEach(tabContent -> {
            saveNewEntity(tabContent, tabContentDTOS, productTabId);
        });


        return tabContentDTOS;
    }

    public void saveNewEntity(TabContentRequestDTO tabContent, List<TabContentDTO> tabContentDTOS, long productTabId) {
        TabContentEntity entity = new TabContentEntity();
        modelMapper.map(tabContent, entity);
        entity.setProductTabId(productTabId);

        TabContentEntity savedEntity = tabContentRepository.save(entity);

        TabContentDTO dto = new TabContentDTO();
        modelMapper.map(savedEntity, dto) ;

        tabContentDTOS.add(dto);
    }

    @Override
    public List<TabContentDTO> update(List<Long> removedContents, List<TabContentRequestDTO> addedContents,List<TabContentRequestDTO> editContents, long productTabId) {
        List<TabContentDTO> tabContentDTOS = new ArrayList<>();

        List<TabContentEntity> removedEntities = tabContentRepository.findAllById(removedContents);

        if(!removedEntities.isEmpty()) {
            tabContentRepository.deleteAll(removedEntities);
        }

        addedContents.forEach(el -> {
            saveNewEntity(el , tabContentDTOS, productTabId);
        });

        editContents.forEach(el -> {
            TabContentDTO dto = new TabContentDTO();
            Optional<TabContentEntity> optional = tabContentRepository.findById(el.getId());
            optional.ifPresent(tabContentEntity -> {
                modelMapper.map(el , tabContentEntity);

                modelMapper.map(tabContentRepository.save(tabContentEntity), dto);
                tabContentDTOS.add(dto);
            });
        });

        return tabContentDTOS;
    }



    @Override
    public void delete(List<Long> ids) {
        List<TabContentEntity> entities = tabContentRepository.findAllById(ids);

        tabContentRepository.deleteAll(entities);
    }


}
