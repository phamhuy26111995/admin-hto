package com.hto.admin.repository;

import com.hto.admin.dto.ProductTabDTO;
import com.hto.admin.dto.TabContentDTO;
import com.hto.admin.entity.ProductTabEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProductTabRepository extends JpaRepository<ProductTabEntity, Long> {

    @Query("SELECT new com.hto.admin.dto.ProductTabDTO(t.id,t.title,t.productId) FROM ProductTabEntity t WHERE t.productId = :productId")
    List<ProductTabDTO> getTabByProduct(@Param("productId") long productId);
}
