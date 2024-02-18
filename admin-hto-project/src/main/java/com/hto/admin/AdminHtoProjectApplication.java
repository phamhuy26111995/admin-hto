package com.hto.admin;

import com.hto.admin.dto.PermissionDTO;
import com.hto.admin.entity.UserEntity;
import com.hto.admin.repository.UserRepository;
import com.hto.admin.service.PermissionService;
import com.hto.admin.service.UserPermissionService;
import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;

@SpringBootApplication
@OpenAPIDefinition(info = @Info(title = "HTO ADMIN PROJECT",
        version = "1.0.0",
        description = "This project is belong to HTOcean Group",
        contact = @Contact(name = "Huy Pham", email = "pham.huy.19951126@gmail.com")
))
public class AdminHtoProjectApplication implements CommandLineRunner {
    @Autowired
    UserRepository userRepository;
    @Autowired
    PasswordEncoder passwordEncoder;
    @Autowired
    PermissionService permissionService;
    @Autowired
    UserPermissionService userPermissionService;

    public static void main(String[] args) {
        SpringApplication.run(AdminHtoProjectApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        List<UserEntity> rootUsers = userRepository.findByRole("ROLE_ROOT");

        if (!rootUsers.isEmpty()) return;
        UserEntity user = new UserEntity();
        user.setUsername("root");
        user.setPassword(passwordEncoder.encode("root"));
        user.setCode("ROOT");
        user.setRole("ROLE_ROOT");
        user.setName("ROOT");
        user.setEmail("pham.huy.19951126@gmail.com");

        UserEntity rootUser = userRepository.save(user);

        List<PermissionDTO> permissions = permissionService.getAllPermission();

        userPermissionService.save(permissions, rootUser.getId());

    }
}
