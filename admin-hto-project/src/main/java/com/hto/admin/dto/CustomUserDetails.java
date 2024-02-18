package com.hto.admin.dto;

import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;

import java.util.Collection;


@Getter
@Setter
public class CustomUserDetails extends User {

    private Long id;
    private String role;
    private String email;

    public CustomUserDetails(String username, String password, Collection<? extends GrantedAuthority> authorities) {
        super(username, password, authorities);
    }

    public CustomUserDetails(Long id, String username, String password, Collection<? extends GrantedAuthority> authorities, String role, String email) {
        super(username, password, authorities);
        this.email = email;
        this.role = role;
        this.id = id;
    }


}
