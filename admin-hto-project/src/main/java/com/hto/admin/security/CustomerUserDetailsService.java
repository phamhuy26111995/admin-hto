package com.hto.admin.security;

import com.hto.admin.entity.UserEntity;
import com.hto.admin.repository.IUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Service
@RequiredArgsConstructor
public class CustomerUserDetailsService implements UserDetailsService {

    private final IUserRepository iUserRepository ;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return iUserRepository.findByUsername(username).orElseThrow(()-> new UsernameNotFoundException("User not found !"));

    }


}
