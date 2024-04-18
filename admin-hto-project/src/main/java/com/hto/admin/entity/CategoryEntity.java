package com.hto.admin.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.DynamicUpdate;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
@Table(name = "category")
@DynamicUpdate
public class CategoryEntity extends BaseEntity {

    private String title;

    private String image;

    @Transient
    private String createByUserName;

}
