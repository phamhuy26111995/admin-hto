package com.hto.admin.service.impl;

import com.hto.admin.dto.CategoryDTO;
import com.hto.admin.dto.CategoryRequestDTO;
import com.hto.admin.entity.CategoryEntity;
import com.hto.admin.repository.CategoryRepository;
import com.hto.admin.service.CategoryService;
import com.hto.admin.service.CloudinaryService;
import org.apache.commons.lang3.StringUtils;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private CloudinaryService cloudinaryService;

    @Override
    public List<CategoryEntity> getAllCategory() {
        List<CategoryEntity> categoryEntities = categoryRepository.findAllNotDeleted();
        return categoryEntities;
    }

    @Override
    public CategoryDTO getById(long id) {
        CategoryDTO dto = new CategoryDTO();
        Optional<CategoryEntity> optional = categoryRepository.findById(id);

        optional.ifPresent(categoryEntity -> {
            modelMapper.map(categoryEntity, dto);
        });

        return dto;
    }

    @Override
    public long createCategory(CategoryRequestDTO categoryRequestDTO, MultipartFile image) {
        try {
            CategoryEntity entity = new CategoryEntity();
            entity.setTitle(categoryRequestDTO.getTitle());

            String imageUrl = cloudinaryService.uploadFile(image);

            if (StringUtils.isNotEmpty(imageUrl)) {
                entity.setImage(imageUrl);
            }


            CategoryEntity savedEntity = categoryRepository.save(entity);

            return savedEntity.getId();

        } catch (Exception e) {
            e.printStackTrace();
            return 0;
        }
    }

    @Override
    public long updateCategory(CategoryRequestDTO categoryRequestDTO, MultipartFile image) {
        Optional<CategoryEntity> entityOptional = categoryRepository.findById(categoryRequestDTO.getId());

        if (entityOptional.isEmpty()) return 0;


        CategoryEntity entity = entityOptional.get();

        modelMapper.map(categoryRequestDTO, entity);

        if (image != null) {
            String imageUrl = cloudinaryService.uploadFile(image);
            entity.setImage(imageUrl);
        }

        categoryRepository.save(entity);

        return entity.getId();
    }


}
