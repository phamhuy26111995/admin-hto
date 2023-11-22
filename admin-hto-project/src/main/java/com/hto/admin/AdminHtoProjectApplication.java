package com.hto.admin;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;



@SpringBootApplication
@OpenAPIDefinition(info = @Info(title = "HTO ADMIN PROJECT",
				version = "1.0.0",
				description = "This project is belong to HTOcean Group",
				contact = @Contact(name = "Huy Pham", email = "pham.huy.19951126@gmail.com")
))
public class AdminHtoProjectApplication {

	public static void main(String[] args) {
		SpringApplication.run(AdminHtoProjectApplication.class, args);
	}

}
