package com.hto.admin.repository;

import com.hto.admin.dto.CategoryDTO;
import com.hto.admin.entity.CategoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoryRepository extends JpaRepository<CategoryEntity, Long> {

    @Query("SELECT new com.hto.admin.dto.CategoryDTO(e.id, e.title, e.image, e.createdAt, e.createdBy, e.updatedAt, e.updatedBy, e.deleted, e.status, u.name) FROM CategoryEntity e LEFT JOIN UserEntity u ON e.createdBy = u.id WHERE e.deleted = false")
    List<CategoryDTO> findAllNotDeleted();

}
