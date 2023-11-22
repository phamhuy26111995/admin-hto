package com.hto.admin.service.impl;

import com.hto.admin.dto.CategoryDTO;
import com.hto.admin.dto.CategoryRequestDTO;
import com.hto.admin.entity.CategoryEntity;
import com.hto.admin.repository.CategoryRepository;
import com.hto.admin.service.CategoryService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;
    @Autowired
    private ModelMapper modelMapper;
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
    public long createCategory(CategoryRequestDTO categoryRequestDTO) {
         CategoryEntity entity = new CategoryEntity();
         entity.setImage(categoryRequestDTO.getImage());
         entity.setTitle(categoryRequestDTO.getTitle());

         CategoryEntity savedEntity = categoryRepository.save(entity);

        return savedEntity.getId();
    }

    @Override
    public long updateCategory(CategoryRequestDTO categoryRequestDTO) {
        Optional<CategoryEntity> entityOptional = categoryRepository.findById(categoryRequestDTO.getId());

        if(entityOptional.isEmpty()) return 0;

        CategoryEntity entity = entityOptional.get();

        entity.setStatus(categoryRequestDTO.getStatus());
        entity.setTitle(categoryRequestDTO.getTitle());
        entity.setImage(categoryRequestDTO.getImage());

        categoryRepository.save(entity);

        return entity.getId();
    }


}
