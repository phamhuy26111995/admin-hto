package com.hto.admin.repository;

import com.hto.admin.dto.ProductDTO;
import com.hto.admin.dto.ProductRequestDTO;

import java.util.List;

public interface ProductRepositoryCustom {
    List<ProductDTO> getProductByFilter(ProductRequestDTO requestDTO);
}
