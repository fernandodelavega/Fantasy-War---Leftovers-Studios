package com.example.demo;

import java.io.File;
import java.io.IOException;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/chat")
public class ChatController {
	
	public static File msgs = new File("src\\main\\java\\com\\example\\demo\\messageList.txt");
	public static TextToFile ttf = new TextToFile();
	
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public static void NewMessage(@RequestBody String text){

		//sSystem.out.println(text + "abc");
		ttf.NewText(msgs, text);
		
	}
	
	@GetMapping
	public static String[] GetMessage() throws IOException {
		
		return ttf.GetText(msgs);
	}
	
	
	public static void main() throws IOException {

		NewMessage("a");
		String[] t = GetMessage();
		for(String a :t) {
			
			System.out.println(a);
		}
		
	}

}
