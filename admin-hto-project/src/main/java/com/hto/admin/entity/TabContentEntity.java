package com.hto.admin.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.DynamicUpdate;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
@Table(name = "tab_content")
@DynamicUpdate
public class TabContentEntity extends BaseEntity {
    private String title;
    private String content;
    private long productTabId;
    private String type;
}
