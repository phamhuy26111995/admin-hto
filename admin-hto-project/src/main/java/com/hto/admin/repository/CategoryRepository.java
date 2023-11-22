package com.hto.admin.repository;

import com.hto.admin.entity.CategoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoryRepository extends JpaRepository<CategoryEntity, Long> {

    @Query("SELECT e FROM CategoryEntity e WHERE e.isDeleted = false")
    List<CategoryEntity> findAllNotDeleted();
}
