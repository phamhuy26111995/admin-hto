package com.hto.admin.service;

import com.hto.admin.dto.ProductTabDTO;
import com.hto.admin.dto.ProductTabRequestDTO;

import java.util.List;

public interface ProductTabService {
    List<ProductTabDTO> getTabByProduct(long productId);

    List<ProductTabDTO> save(List<ProductTabRequestDTO> requestDTOS, long productId);
    List<ProductTabDTO> update(List<ProductTabRequestDTO> requestDTOS, long productId);

    void delete(List<Long> removedProductTab);

}
