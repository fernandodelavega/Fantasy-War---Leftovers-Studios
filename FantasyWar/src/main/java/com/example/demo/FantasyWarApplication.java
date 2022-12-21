package com.example.demo;

import java.io.FileReader;
import java.io.BufferedReader;
import java.io.IOException;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class FantasyWarApplication {

	
	@Bean
	public UserService usersService(){
		return new UserService(10);
	}
	public static void main(String[] args){		
		SpringApplication.run(FantasyWarApplication.class, args);
	}

}
