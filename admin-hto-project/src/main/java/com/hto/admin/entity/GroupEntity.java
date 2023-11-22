package com.hto.admin.entity;


import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.DynamicUpdate;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
@Table(name = "groups")
@DynamicUpdate
public class GroupEntity extends BaseEntity {
    private String title;
}
