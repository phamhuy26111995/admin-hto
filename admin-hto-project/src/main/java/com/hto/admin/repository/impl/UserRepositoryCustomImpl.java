package com.hto.admin.repository.impl;

import com.hto.admin.dto.UserDTO;
import com.hto.admin.dto.UserRequestDTO;
import com.hto.admin.repository.UserRepositoryCustom;
import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class UserRepositoryCustomImpl implements UserRepositoryCustom {

    @Autowired
    private EntityManager entityManager;

    @Override
    public List<UserDTO> getUserByFilter(UserRequestDTO requestDTO) {
        String queryString = "SELECT new com.hto.admin.dto.UserDTO(u.id, u.name, u.code, u.username, u.image, u.email, u.phone, u.birthday, u.createdAt, u.createdBy, u.updatedAt, u.updatedBy, u.status) " +
                "FROM UserEntity u WHERE u.status = 'ACTIVE' AND u.isDeleted = false ";


        StringBuilder queryBuilder = new StringBuilder(queryString);

        setConditionQueryString(queryBuilder, requestDTO);

        Query query = entityManager.createQuery(queryBuilder.toString());

        setParamForQuery(query, requestDTO);


        return query.getResultList();
    }

    private void setConditionQueryString(StringBuilder queryBuilder, UserRequestDTO requestDTO) {
        if (StringUtils.isNotEmpty(requestDTO.getCode())) {
            queryBuilder.append(" AND u.code LIKE :userCode ");
        }

        if (StringUtils.isNotEmpty(requestDTO.getName())) {
            queryBuilder.append(" AND u.name LIKE :name ");
        }

        if (StringUtils.isNotEmpty(requestDTO.getEmail())) {
            queryBuilder.append(" AND u.email LIKE :email ");
        }

        if (StringUtils.isNotEmpty(requestDTO.getUsername())) {
            queryBuilder.append(" AND u.username LIKE :username ");
        }

    }

    private void setParamForQuery(Query query, UserRequestDTO requestDTO) {
        if (StringUtils.isNotEmpty(requestDTO.getCode())) {
            query.setParameter("userCode", "%" + requestDTO.getCode().trim() + "%");
        }

        if (StringUtils.isNotEmpty(requestDTO.getName())) {
            query.setParameter("name", "%" + requestDTO.getName().trim() + "%");
        }

        if (StringUtils.isNotEmpty(requestDTO.getEmail())) {
            query.setParameter("email", "%" + requestDTO.getEmail().trim() + "%");
        }

        if (StringUtils.isNotEmpty(requestDTO.getUsername())) {
            query.setParameter("username", "%" + requestDTO.getUsername().trim() + "%");
        }
    }
}
