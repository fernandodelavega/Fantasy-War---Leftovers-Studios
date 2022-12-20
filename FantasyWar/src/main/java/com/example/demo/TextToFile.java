package com.example.demo;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;

public class TextToFile {

	public void NewText(File file, String text) {
		
		try {
			if (!file.exists()) {
	            file.createNewFile();
	        }
			FileWriter fw = new FileWriter(file.getAbsoluteFile());
			BufferedWriter bw = new BufferedWriter(fw);
			bw.write(text);
			bw.write("\n");
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
        
	}
	public String[] GetText(File file) throws IOException {
		// Creating an object of BufferedReader class
        BufferedReader br = new BufferedReader(new FileReader(file));
 
        // Declaring a string variable
        String[] st = new String[0];
        st = push(st, br.readLine());
        // Condition holds true till
        // there is character in a string
        for(int i = 0; st[i] != null; i++){
        	
        	st = push(st, br.readLine());
        
        }
         
            // Print the string
            System.out.println(st);
        
        System.out.println("Done");
		return st;
	}
	
	private static String[] push(String[] array, String push) {
	    String[] longer = new String[array.length + 1];
	    System.arraycopy(array, 0, longer, 0, array.length);
	    longer[array.length] = push;
	    return longer;
	}
}