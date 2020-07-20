package com.demo.profileproject;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@EnableCaching
public class ProfileProjectApplication {

	public static void main(String[] args) {
		SpringApplication.run(ProfileProjectApplication.class, args);
	}

}
