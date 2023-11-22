package com.hto.admin.service;

import com.hto.admin.dto.CategoryDTO;
import com.hto.admin.dto.CategoryRequestDTO;
import com.hto.admin.entity.CategoryEntity;

import java.util.List;

public interface CategoryService {
    public List<CategoryEntity> getAllCategory();

    public CategoryDTO getById(long id);

    public long createCategory(CategoryRequestDTO categoryRequestDTO);

    public long updateCategory(CategoryRequestDTO categoryRequestDTO);
}
