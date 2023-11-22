package com.hto.admin.service;

import com.hto.admin.dto.ProductDTO;
import com.hto.admin.dto.ProductRequestDTO;
import com.hto.admin.dto.ProductTabDTO;
import com.hto.admin.dto.ProductTabRequestDTO;

import java.util.List;

public interface ProductService {

    public List<ProductDTO> getAllProduct();

    public ProductDTO getProductById(long productId);
    public ProductDTO save(ProductRequestDTO productRequestDTO);

    public ProductDTO update(ProductRequestDTO productRequestDTO);

    public void delete(ProductRequestDTO productRequestDTO);
}
