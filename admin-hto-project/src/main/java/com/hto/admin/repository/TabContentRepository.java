package com.hto.admin.repository;

import com.hto.admin.dto.TabContentDTO;
import com.hto.admin.entity.TabContentEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TabContentRepository extends JpaRepository<TabContentEntity, Long> {

    @Query("SELECT new com.hto.admin.dto.TabContentDTO(t.id,t.title,t.content, t.productTabId,t.type) FROM TabContentEntity t WHERE t.productTabId = :productTabId")
    List<TabContentDTO> getTabContentByProductTab(long productTabId);
}
