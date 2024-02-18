package com.hto.admin.security;

import com.hto.admin.consts.UserStatus;
import com.hto.admin.dto.CustomUserDetails;
import com.hto.admin.entity.UserEntity;
import com.hto.admin.repository.IUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;


@Service
@RequiredArgsConstructor
public class CustomerUserDetailsService implements UserDetailsService {

    private final IUserRepository iUserRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        List<GrantedAuthority> authorities;

        UserEntity userEntity = iUserRepository.findByUsernameAndStatus(username, UserStatus.ACTIVE.name()).orElseThrow(() -> new UsernameNotFoundException("Người dùng đã bị ngưng hoạt động hoặc sai username password"));

        authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority(userEntity.getRole()));

        return new CustomUserDetails(userEntity.getId(), userEntity.getUsername(), userEntity.getPassword(), authorities, userEntity.getRole(), userEntity.getEmail());

    }


}
