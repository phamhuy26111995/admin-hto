package com.hto.admin.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.DynamicUpdate;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
@Table(name = "user_permission")
@DynamicUpdate
public class UserPermissionEntity extends BaseEntity {
    @Column(name = "user_id")
    private long userId;
    @Column(name = "permission_id")
    private long permissionId;
}
