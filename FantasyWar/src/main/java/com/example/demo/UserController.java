package com.example.demo;

import java.util.Collection;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
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

	Map<Long, User> usuarios = new ConcurrentHashMap<>(); 
	AtomicLong nextId = new AtomicLong(0);
	
	@GetMapping
	public Collection<User> items() {
		return usuarios.values();
	}

	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public User nuevoUser(@RequestBody User usuario) {

		long id = nextId.incrementAndGet();
		usuario.setId(id);
		usuarios.put(id, usuario);
		try {
		      FileWriter myWriter = new FileWriter("src\\main\\java\\com\\example\\demo\\usuarios.txt");
		      myWriter.append(usuario.getNombre()+'\n'+usuario.getContra()+'\n');
		      myWriter.flush();
		      myWriter.close();
		      
		      System.out.println("Successfully wrote to the file.");
		    } catch (IOException e) {
		      System.out.println("An error occurred.");
		      e.printStackTrace();
		    }

		return usuario;
	}

	@PutMapping("/{id}")
	public ResponseEntity<User> actulizaItem(@PathVariable long id, @RequestBody User updtUsuario) {

		User savedUsuario = usuarios.get(updtUsuario.getId());

		if (savedUsuario != null) {

			usuarios.put(id, updtUsuario);

			return new ResponseEntity<>(updtUsuario, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@GetMapping("/{id}")
	public ResponseEntity<User> getItem(@PathVariable long id) {

		User savedItem = usuarios.get(id);

		if (savedItem != null) {
			return new ResponseEntity<>(savedItem, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<User> borraItem(@PathVariable long id) {

		User savedUsuario = usuarios.get(id);

		if (savedUsuario != null) {
			usuarios.remove(savedUsuario.getId());
			return new ResponseEntity<>(savedUsuario, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

}

