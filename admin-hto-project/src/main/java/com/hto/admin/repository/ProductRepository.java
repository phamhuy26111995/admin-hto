package com.hto.admin.repository;

import com.hto.admin.dto.ProductDTO;
import com.hto.admin.dto.ProductRequestDTO;
import com.hto.admin.entity.ProductEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProductRepository extends JpaRepository<ProductEntity, Long>, ProductRepositoryCustom {

}
