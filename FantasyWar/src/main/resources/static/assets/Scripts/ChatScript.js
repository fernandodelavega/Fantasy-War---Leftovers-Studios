
function LoadMessage(callback) {
	$.ajax({
    method:"GET",
    url:"http://localhost:8080/chat",
    processData:false,
    headers:{"Content-Type":"application/json"}
    }).done(function(usuarios) {
		console.log(usuarios);
        callback(usuarios);
    })
}

//Crear un usuario
function CreateMessage() {
    $.ajax({
    method:"POST",
    url:"http://localhost:8080/chat",
    data:JSON.stringify(usuario),
    processData:false,
    headers:{"Content-Type":"application/json"}
    }).done(function(usuario) {
		console.log(usuario)
    })
}