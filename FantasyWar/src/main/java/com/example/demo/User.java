package com.example.demo;

public class User
{
	private long id;
	private String nombre;
	private String contra;
	public long getId() 
	{
		return id;
	}
	public void setId(long id) 
	{
		this.id = id;
	}
	public String getNombre() 
	{
		return nombre;
	}
	public void setNombre(String nombre) 
	{
		this.nombre = nombre;
	}
	public String getContra() 
	{
		return contra;
	}
	public void setContra(String contra) 
	{
		this.contra = contra;
	}
	
	@Override
	public String toString() 
	{
		return "Perfil [nombre=" + nombre + ", contraseña=" + contra + "]";
	}
}
