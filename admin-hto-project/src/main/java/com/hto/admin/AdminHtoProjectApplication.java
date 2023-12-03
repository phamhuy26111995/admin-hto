package com.hto.admin;

import com.hto.admin.repository.UserRepository;
import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.password.PasswordEncoder;

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
	public static void main(String[] args) {
		SpringApplication.run(AdminHtoProjectApplication.class, args);
	}
	@Override
	public void run(String... args) throws Exception {
/*		UserEntity user  = new UserEntity();
		user.setUsername("admin");
		user.setPassword(passwordEncoder.encode("admin"));
		userRepository.save(user);*/
	}
}
