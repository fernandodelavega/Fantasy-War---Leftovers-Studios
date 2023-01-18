var loadedUsuarios = [];
var usuario;
//var ocurrencia=false;
function loadUsuarios(callback) {
	$.ajax({
    method:"GET",
    url:"http://localhost:8080/usuarios",
    processData:false,
    headers:{"Content-Type":"application/json"}
    }).done(function(usuarios) {
		console.log(usuarios);
        callback(usuarios);
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
	//loadUsuarios();
	loadUsuarios(function (usuarios) { 
        
        for (var i = 0; i < usuarios.length; i++) {
            loadedUsuarios.push(usuarios[i]);
        }
    });
	
	
	
	
	//Handler Boton crear usuario
	$("#createButton").click(function () {

        var nombre = $("#nameText").val();
        var contra = $("#passText").val();
        //si el nombre existe no lo añade, else lo añade
        var usado=false;
		for(var i=0;i<loadedUsuarios.length;i++)
		{
			if(nombre==loadedUsuarios[i].nombre)
			{
				usado=true;
			}
		}
		if(usado)
		{
        	console.log("Usuario ya en uso");
		}
		else
		{if (contra==null){
			console.log("Introduzca una contraseña");
		}else{
        
        
        
        var usuario = {
            nombre: nombre,
            contra: contra
        }
		loadedUsuarios.push(usuario);
        crearUsuario(usuario);
		SendMessage("usuario", JSON.stringify(usuario))
    
    }}
    $("#nameText").val('');
       
    $("#passText").val('');
    });
    
    
    //inicio de sesión
    $("#initButton").click(function () {

        var nombre = $("#nameText").val();
        var contra = $("#passText").val();
        
		for(var i=0;i<loadedUsuarios.length;i++)
		{
			if(nombre==loadedUsuarios[i].nombre)
			{
				if(contra!=loadedUsuarios[i].contra)
				{
					console.log("contraseña incorrecta");
				}
				else
				{
					console.log("Usuario iniciado: "+loadedUsuarios[i].nombre);
					usuario=loadedUsuarios[i].nombres;
					SendMessage("usuario", "Ha iniciado sesión el usuario: "+ nombre);
        			$("#passText").disabled=true;
        			$("#initButton").disabled=true;
				}
			}
		}
		$("#nameText").val('')
        $("#passText").val('');
    });
    
 
        //recorre el txt, si existe y es correcto (contraseña)-->inicia sesion, si no, mensajes de error
        
        
   
	
})