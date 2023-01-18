package com.example.demo;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@SpringBootApplication
@EnableWebSocket
public class FantasyWarApplication implements WebSocketConfigurer {

	
	@Bean
	public UserService usersService(){
		return new UserService(10);
	}
	public static void main(String[] args){		
		SpringApplication.run(FantasyWarApplication.class, args);
	}
	
	@Override
	public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
		registry.addHandler(messageHandler(), "/echo").setAllowedOrigins("*");		
	}
	@Bean
	public WebSocketHandler messageHandler() {
		return new WebSocketServer();
	}

}
