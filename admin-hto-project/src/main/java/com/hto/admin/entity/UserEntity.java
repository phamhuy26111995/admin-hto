package com.hto.admin.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.DynamicUpdate;

import java.util.Date;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
@Table(name = "users")
@DynamicUpdate
public class UserEntity extends BaseEntity{
    private String name;
    private String username;
    private String image;
    private String email;
    private String phone;
    private Date birthday;
    private String password;
}
