package com.example.demo;

import java.util.Collection;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;
import java.io.FileReader;
import java.io.BufferedReader;
import java.io.File;
import java.util.Random;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/usuarios")
public class UserController {

	Random rand = new Random();
	public static File users = new File("src\\main\\java\\com\\example\\demo\\usuarios.txt");
	public static TextToFile ttf = new TextToFile();

	
	public void NewUser(String user, String pass){
		ttf.NewText(users, (Integer.toString(rand.nextInt(9)))+(Integer.toString(rand.nextInt(9)))+(Integer.toString(rand.nextInt(9)))+(Integer.toString(rand.nextInt(9)))+(Integer.toString(rand.nextInt(9)))+(Integer.toString(rand.nextInt(9)))+(Integer.toString(rand.nextInt(9)))+(Integer.toString(rand.nextInt(9)))+(Integer.toString(rand.nextInt(9)))+(Integer.toString(rand.nextInt(9)))+(Integer.toString(rand.nextInt(9)))+(Integer.toString(rand.nextInt(9))));
		ttf.NewText(users, user);
		ttf.NewText(users, pass);
	}
	

	public String[] GetUser() throws IOException {
		
		return ttf.GetText(users);
	}
	
	
	public static void main() throws IOException {

		
	}

	// Map<Long, User> usuarios = new ConcurrentHashMap<>(); 
	// AtomicLong nextId = new AtomicLong(0);
	
	// @GetMapping
	// public Collection<User> items() throws IOException{
	// 	BufferedReader br = new BufferedReader(new FileReader("src\\main\\java\\com\\example\\demo\\usuarios.txt"));
    //     while(br.readLine()!=null) {
    //     User usuario=new User();
    //     long id = nextId.incrementAndGet();
    //     usuario.setId(id);
    //     String nombre=br.readLine();
    //     String contra=br.readLine();
    //     usuario.setNombre(nombre);
    //     usuario.setContra(contra);
    //     usuarios.put(id, usuario);
    //     }
    //     br.close();
    //     System.out.println(usuarios);
    //     return usuarios.values();
		
		
	// }

	// @PostMapping
	// @ResponseStatus(HttpStatus.CREATED)
	// public User nuevoUser(@RequestBody User usuario) {

	// 	long id = nextId.incrementAndGet();
	// 	usuario.setId(id);
	// 	usuarios.put(id, usuario);
	// 	try {
	// 	    String carga = "Existe \n" + usuario.getNombre()+'\n'+usuario.getContra()+'\n';
	// 	    Files.write(Paths.get("src\\main\\java\\com\\example\\demo\\usuarios.txt"), carga.getBytes(), StandardOpenOption.APPEND);
	// 	} catch (IOException e) {
	// 	      System.out.println("An error occurred.");
	// 	      e.printStackTrace();
	// 	    }
		    
	// 		/*FileWriter myWriter = new FileWriter("src\\main\\java\\com\\example\\demo\\usuarios.txt");
	// 	      myWriter.append(usuario.getNombre()+'\n'+usuario.getContra()+'\n');
	// 	      myWriter.flush();
	// 	      myWriter.close();
		      
	// 	      System.out.println("Successfully wrote to the file.");
	// 	    } catch (IOException e) {
	// 	      System.out.println("An error occurred.");
	// 	      e.printStackTrace();
	// 	    }*/

	// 	return usuario;
	// }

	
}

