package com.hto.admin.service.impl;

import com.hto.admin.dto.*;
import com.hto.admin.entity.ProductEntity;
import com.hto.admin.service.ProductRepository;
import com.hto.admin.service.ProductService;
import com.hto.admin.service.ProductTabService;
import com.hto.admin.service.TabContentService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private ProductTabService productTabService;
    @Autowired
    private TabContentService tabContentService;

    @Autowired
    private ModelMapper modelMapper;
    
    @Override
    public List<ProductDTO> getAllProduct() {
        List<ProductDTO> dtos = new ArrayList<>();
        List<ProductEntity> entities = productRepository.findAll();

        entities.forEach(entity -> {
            ProductDTO dto = new ProductDTO();
            modelMapper.map(entity, dto);

            dtos.add(dto);
        });
        
        return dtos;
    }

    @Override
    public ProductDTO getProductById(long productId) {
        ProductDTO dto = new ProductDTO();
        Optional<ProductEntity> optional = productRepository.findById(productId);

        optional.ifPresent(entity -> {
            modelMapper.map(entity, dto);

            List<ProductTabDTO> productTabDTOList = productTabService.getTabByProduct(entity.getId());
            productTabDTOList.forEach(productTab -> {
                List<TabContentDTO> tabContentDTOList = tabContentService.getTabContentByProductTab(productTab.getId());
                productTab.setTabContentDTOList(tabContentDTOList);
            });

            dto.setProductTabDTOList(productTabDTOList);

        });



        return dto;
    }

    @Override
    public ProductDTO save(ProductRequestDTO productRequestDTO) {
        ProductEntity entity = new ProductEntity();
        ProductDTO dto = new ProductDTO();
        modelMapper.map(productRequestDTO, entity);

        ProductEntity savedEntity = productRepository.save(entity);

        List<ProductTabDTO> productTabDTOList = productTabService.save(productRequestDTO.getAddedTabs(), savedEntity.getId());

        modelMapper.map(savedEntity, dto);
        dto.setProductTabDTOList(productTabDTOList);

        return dto;
    }

    @Override
    public ProductDTO update(ProductRequestDTO productRequestDTO) {
        ProductDTO dto = new ProductDTO();

        Optional<ProductEntity> optional = productRepository.findById(productRequestDTO.getId());

        optional.ifPresent(entity -> {
            modelMapper.map(productRequestDTO, entity);

            modelMapper.map(entity, dto);

           productTabService.save(productRequestDTO.getAddedTabs(), entity.getId());

           productTabService.update(productRequestDTO.getEditedTabs(), entity.getId());


           productRepository.save(entity);


        });

        productTabService.delete(productRequestDTO.getRemovedTabs());

        return dto;
    }

    @Override
    public void delete(ProductRequestDTO removeProduct) {
        Optional<ProductEntity> optional = productRepository.findById(removeProduct.getId());

        optional.ifPresent(entity -> {
            productTabService.delete(removeProduct.getRemovedTabs());

            entity.setDeleted(true);

            productRepository.save(entity);
        });
    }
}
