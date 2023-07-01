var loadedUsuarios = [];
var usuario;
//var ocurrencia=false;
function loadUsuarios(callback) {
	$.ajax({
    method:"GET",
    url:"http://"+ location.host +":8080/usuarios",
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
    url:"http://"+ location.host +":8080/usuarios",
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
	
	//Handler Boton crear usuario
	$("#createButton").click(function () {

        var nombre = $("#nameText").val();
        var contra = $("#passText").val();
        
        var usuario = {
            nombre: nombre,
            contra: contra
        }
        sent = true;
		SendMessage("usuario1", JSON.stringify(usuario))
    
    
    $("#nameText").val('');
       
    $("#passText").val('');
    });
    
    
    //inicio de sesión
    $("#initButton").click(function () {

        var nombre = $("#nameText").val();
        var contra = $("#passText").val();
		var usuario = {
            nombre: nombre,
            contra: contra
        }
        sent = true;
		SendMessage("usuario2", JSON.stringify(usuario));
        $("#passText").disabled=true;
        $("#initButton").disabled=true;
		
		$("#nameText").val('')
        $("#passText").val('');
	});
});

	
