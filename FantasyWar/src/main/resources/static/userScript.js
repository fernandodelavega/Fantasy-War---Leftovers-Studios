var loadedUsuarios;
function loadUsuarios() {
	$.ajax({
    method:"GET",
    url:"http://localhost:8080/usuarios",
    processData:false,
    headers:{"Content-Type":"application/json"}
    }).done(function(usuarios) {
		console.log(usuarios);
        loadedUsuarios=usuarios;
    })
}

//Crear un usuario
function crearUsuario(usuario) {
    $.ajax({
    method:"POST",
    url:"http://localhost:8080/usuarios",
    data:JSON.stringify(usuario),
    processData:false,
    headers:{"Content-Type":"application/json"}
    }).done(function(usuario) {
		console.log(usuario)
    })
}


//Control de inputs, relacionado con perfil

$(document).ready(function()
{
	//loadPerfiles();
	
	
	
	
	
	//Handler Boton crear usuario
	$("#createButton").click(function () {

        var nombre = $("#nameText").val();
        var contra = $("#passText").val();
        //si el nombre existe no lo añade, else lo añade
        var usuario = {
            nombre: nombre,
            contra: contra
        }

        
    })
    
    $("#initButton").click(function () {

        //recorre el txt, si existe y es correcto (contraseña)-->inicia sesion, si no, mensajes de error
        
        
    })
	
})