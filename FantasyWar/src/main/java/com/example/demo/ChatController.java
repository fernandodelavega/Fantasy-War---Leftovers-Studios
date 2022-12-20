package com.example.demo;

import java.io.IOException;

import org.springframework.web.bind.annotation.RestController;

@RestController
public class ChatController {

	public TextToFile ttf;
	public void main() {
		ttf = new TextToFile();
		
	}
	public void NewMessage(){
		
		ttf.NewMessage("a");

	}
	public String[] GetMessage() throws IOException {
		
		return ttf.GetMessages();
	}

}
