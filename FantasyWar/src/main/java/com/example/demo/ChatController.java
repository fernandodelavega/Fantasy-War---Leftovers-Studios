package com.example.demo;

import java.io.File;
import java.io.IOException;

import org.springframework.web.bind.annotation.RestController;

@RestController
public class ChatController {
	
	public File msg;
	public TextToFile ttf;
	public void main() {
		ttf = new TextToFile();
		
	}
	public void NewMessage(){
		
		ttf.NewText(msg, "a");

	}
	public String[] GetMessage() throws IOException {
		
		return ttf.GetText(msg);
	}

}
