package com.example.demo;

import java.io.File;
import java.io.IOException;

import org.springframework.web.bind.annotation.RestController;

@RestController
public class ChatController {
	
	public static File msg;
	public static TextToFile ttf;
	public static void NewMessage(String text){
		
		ttf.NewText(msg, text);
		
	}
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
