package com.hto.admin.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "group_permission")
public class GroupPermissionEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "group_id")
    private long groupId;

    @Column(name = "permission_id")
    private long permissionId;
}
