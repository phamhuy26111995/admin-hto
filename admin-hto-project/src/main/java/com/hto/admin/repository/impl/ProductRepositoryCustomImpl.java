package com.hto.admin.repository.impl;

import com.hto.admin.dto.ProductDTO;
import com.hto.admin.dto.ProductRequestDTO;
import com.hto.admin.repository.ProductRepositoryCustom;
import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class ProductRepositoryCustomImpl implements ProductRepositoryCustom {

    @Autowired
    private EntityManager entityManager;

    @Override
    public List<ProductDTO> getProductByFilter(ProductRequestDTO requestDTO) {
        String queryString = "SELECT new com.hto.admin.dto.ProductDTO(p.id,p.title,p.description,p.code,p.categoryId) " +
                "FROM ProductEntity p WHERE p.status = 'ACTIVE' AND p.isDeleted = false ";

        StringBuilder queryBuilder = new StringBuilder(queryString);

        setConditionQueryString(queryBuilder,requestDTO);

        Query query = entityManager.createQuery(queryBuilder.toString());

        setParamForQuery(query, requestDTO);


        return query.getResultList();
    }

    private void setConditionQueryString(StringBuilder queryBuilder, ProductRequestDTO requestDTO) {
        if(StringUtils.isNotEmpty(requestDTO.getCode())) {
            queryBuilder.append(" AND p.code LIKE :productCode ");
        }

        if(StringUtils.isNotEmpty(requestDTO.getTitle())) {
            queryBuilder.append(" AND p.title LIKE :productTitle ");
        }

        if(requestDTO.getCategoryId() > 0) {
            queryBuilder.append(" AND p.categoryId = :categoryId ");
        }

    }

    private void setParamForQuery(Query query, ProductRequestDTO requestDTO) {
        if(StringUtils.isNotEmpty(requestDTO.getCode())) {
            query.setParameter("productCode", "%" + requestDTO.getCode() + "%");
        }

        if(StringUtils.isNotEmpty(requestDTO.getTitle())) {
            query.setParameter("productTitle", "%" + requestDTO.getTitle() + "%");
        }

        if(requestDTO.getCategoryId() > 0) {
            query.setParameter("categoryId", requestDTO.getCategoryId());
        }
    }

}
