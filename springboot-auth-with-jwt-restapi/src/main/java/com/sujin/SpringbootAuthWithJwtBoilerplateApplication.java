package com.sujin;

import java.util.Arrays;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.mongodb.core.MongoOperations;

import com.sujin.app.dto.User;

@SpringBootApplication
public class SpringbootAuthWithJwtBoilerplateApplication {

	public static void main(String[] args) {
		SpringApplication.run(SpringbootAuthWithJwtBoilerplateApplication.class, args);
	}
	
	@Bean
	CommandLineRunner init(MongoOperations operations) {
		return args -> {
//			operations.dropCollection(User.class);

			User commonUser = new User();
			commonUser.setUserId("sujin");
			commonUser.setPassword("1234");
			commonUser.setName("leesujin");
			commonUser.setAuthority(Arrays.asList("USER"));
			commonUser.setEnabled(true);
			
			User adminUser = new User();
			adminUser.setUserId("admin");
			adminUser.setPassword("1234");
			adminUser.setName("admin");
			adminUser.setAuthority(Arrays.asList("ADMIN"));
			adminUser.setEnabled(true);
			
			operations.insert(commonUser);
			operations.insert(adminUser);
			
			operations.findAll(User.class).forEach(user -> {
				System.out.println(user.toString());
			});
		};
	}

}
