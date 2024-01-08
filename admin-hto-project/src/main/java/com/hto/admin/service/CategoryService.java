package com.hto.admin.service;

import com.hto.admin.dto.CategoryDTO;
import com.hto.admin.dto.CategoryRequestDTO;
import com.hto.admin.entity.CategoryEntity;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface CategoryService {
    public List<CategoryEntity> getAllCategory();

    public CategoryDTO getById(long id);

    public long createCategory(CategoryRequestDTO categoryRequestDTO, MultipartFile image);

    public long updateCategory(CategoryRequestDTO categoryRequestDTO, MultipartFile image);
}
