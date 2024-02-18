package com.hto.admin.config;

import com.hto.admin.dto.CustomUserDetails;
import org.springframework.data.domain.AuditorAware;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.Optional;

public class SpringSecurityAuditorAware implements AuditorAware<Long> {

    @Override
    public Optional<Long> getCurrentAuditor() {
        Long currentUserId = getCurrentUserId();
        return Optional.ofNullable(currentUserId);
    }

    private Long getCurrentUserId() {
        CustomUserDetails currentUser = (CustomUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (currentUser == null) return 0L;


        return currentUser.getId();
    }
}
