package com.hto.admin.service.impl;

import com.hto.admin.dto.*;
import com.hto.admin.entity.ProductTabEntity;
import com.hto.admin.repository.ProductTabRepository;
import com.hto.admin.service.ProductTabService;
import com.hto.admin.service.TabContentService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ProductTabServiceImpl implements ProductTabService {

    @Autowired
    private ProductTabRepository productTabRepository;
    @Autowired
    private TabContentService tabContentService;
    @Autowired
    private ModelMapper modelMapper;
    @Override
    public List<ProductTabDTO> getTabByProduct(long productId) {
        return productTabRepository.getTabByProduct(productId);
    }

    @Override
    public List<ProductTabDTO> save(List<ProductTabRequestDTO> requestDTOS, long productId) {
        List<ProductTabDTO> dtos = new ArrayList<>();

        requestDTOS.forEach(productTab -> {
            ProductTabEntity entity = new ProductTabEntity();
            modelMapper.map(productTab, entity);
            entity.setProductId(productId);

            ProductTabEntity savedEntity = productTabRepository.save(entity);

            List<TabContentDTO> tabContentDTOS =  tabContentService.save(productTab.getAddedContents(), savedEntity.getId());

            ProductTabDTO dto = new ProductTabDTO();
            modelMapper.map(savedEntity, dto);

            dto.setTabContentDTOList(tabContentDTOS);

            dtos.add(dto);
        });


        return dtos;
    }

    @Override
    public List<ProductTabDTO> update(List<ProductTabRequestDTO> requestDTOS, long productId) {
        List<ProductTabDTO> dtos = new ArrayList<>();
        requestDTOS.forEach(productTabRequestDTO -> {
            Optional<ProductTabEntity> optional = productTabRepository.findById(productTabRequestDTO.getId());

            optional.ifPresent(entity -> {
                ProductTabDTO dto = new ProductTabDTO();
                List<TabContentDTO> tabContentDTOList = tabContentService.update(productTabRequestDTO.getRemovedContents(),productTabRequestDTO.getAddedContents(),productTabRequestDTO.getEditContents(), productTabRequestDTO.getId());
                modelMapper.map(productTabRequestDTO, entity);
                entity.setProductId(productId);
                modelMapper.map(productTabRepository.save(entity), dto);

                dto.setTabContentDTOList(tabContentDTOList);
                dtos.add(dto);

            });

        });


        return dtos;
    }

    @Override
    public void delete(List<Long> removedProductTab) {
        List<ProductTabEntity> entities = productTabRepository.findAllById(removedProductTab);

        entities.forEach(entity -> {
            List<TabContentDTO> removedTabContents = tabContentService.getTabContentByProductTab(entity.getId());

            List<Long> removedTabContentIds = removedTabContents.stream().map(BaseDTO::getId).toList();

            tabContentService.delete(removedTabContentIds);

        });

        productTabRepository.deleteAll(entities);
    }


}
