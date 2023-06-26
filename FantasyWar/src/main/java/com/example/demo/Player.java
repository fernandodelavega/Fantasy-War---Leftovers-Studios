package com.example.demo;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.JsonObject;

public class Player {
	
	private String name;
	private String ID;
	private boolean ready;
	public Player() {
		
	}
	
	public Player(String name, String id) {
		this.setName(name);
		this.setID(id);
		this.ready = false;
	}
	public boolean GetReady() {
		return ready;
	}
	public void SetReady() {
		ready = !ready;
	}
	public String getID() {
		return ID;
	}
	public void setID(String iD) {
		ID = iD;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public JsonObject GetPlayer() {
		JsonObject json = new JsonObject();
		if(name == null) {
			return null;
		}
		json.addProperty("PlayerName", name);
		json.addProperty("ID", ID);
		json.addProperty("Ready", ready);		
		return json;
	}
}
