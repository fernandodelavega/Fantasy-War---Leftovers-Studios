package com.example.demo;

import com.google.gson.JsonObject;

public class Player {
	
	private String name;
	private String ID;
	private boolean ready;
	private int powerUp;
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
	public void SetReady(boolean ready) {
		this.ready = ready;
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
	
	public int getPowerUp() {
		return powerUp;
	}

	public void setPowerUp(int powerUp) {
		this.powerUp = powerUp;
	}
	public JsonObject GetPlayer() {
		JsonObject json = new JsonObject();
		if(name == null) {
			return null;
		}
		json.addProperty("PlayerName", name);
		json.addProperty("ID", ID);
		json.addProperty("Ready", ready);	
		json.addProperty("powerUp", powerUp);
		return json;
	}
}
