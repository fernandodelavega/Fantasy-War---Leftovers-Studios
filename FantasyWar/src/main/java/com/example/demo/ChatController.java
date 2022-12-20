package com.example.demo;

import java.io.File;
import java.io.IOException;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/chat")
public class ChatController {
	
	public static File msg;
	public static TextToFile ttf;
	
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public static void NewMessage(String text){
		
		ttf.NewText(msg, text);
		
	}
	
	@GetMapping
	public static String[] GetMessage() throws IOException {
		
		return ttf.GetText(msg);
	}
	
	
	public static void main() throws IOException {
		ttf = new TextToFile();
		msg = new  File("./messageList");
		NewMessage("a");
		String[] t = GetMessage();
		for(String a :t) {
			
			System.out.println(a);
		}
		
	}

}
