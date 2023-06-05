var gamescene;

var myId;
var sent = false;
var socket = new WebSocket("ws://localhost:8080/echo");
socket.onopen = function(event) {
    //console.log("Connected to server");
}
//sass
socket.onmessage = function(event) {
    
    //console.log(gamescene);
    //console.log("Received message from server: " + event.data);
    if(JSON.parse(event.data).type == "chat"){
        message = [JSON.parse(event.data)["message1"], JSON.parse(event.data)["message2"], JSON.parse(event.data)["message3"], JSON.parse(event.data)["message4"]];
        gamescene.ReceiveMessage(message);
    }
    if(JSON.parse(event.data).type == "user"){
        gamescene.addPlayer(JSON.parse(event.data)["body"]);
        if(!sent){
            return;
        }
        if(myId == undefined){
            myId=JSON.parse(event.data)["body"];
            sent = false;
        }
        //console.log(myId);
    }
    if(JSON.parse(event.data).type == "unidad"){
        if(JSON.parse(event.data).player == 1){
            gamescene.player1.Instanciate(JSON.parse(event.data).unidad, JSON.parse(event.data).camino, 1);
        }else if(JSON.parse(event.data).player == 2){
            gamescene.player2.Instanciate(JSON.parse(event.data).unidad, JSON.parse(event.data).camino, 2);
        }
    }
    if(JSON.parse(event.data).type == "oro"){
        if(JSON.parse(event.data).player == 1){
            gamescene.player1.AddOro(JSON.parse(event.data).cantidad);
            
        }else if(JSON.parse(event.data).player == 2){
            gamescene.player2.AddOro(JSON.parse(event.data).cantidad);
        }
    }
    if(JSON.parse(event.data).type == "muerteUnidad"){
        console.log("Received message from server: " + event.data);
        if(JSON.parse(event.data).playerNumber == 1){
            gamescene.player1.unidades[JSON.parse(event.data).arrayPos].Die();
        }else if(JSON.parse(event.data).playerNumber == 2){
            gamescene.player2.unidades[JSON.parse(event.data).arrayPos].Die();
        }
    }
}
socket.onclose = function(event) {
    //console.log("Disconnected from server");
}

function SendMessage(type, msg){
    if(type != "oro"){
        console.log(msg);
    }
    
    sent = true;
    if (!isOpen(socket)) return;
    socket.send(JSON.stringify({type:type, body: msg}));
}
function isOpen(ws) { return ws.readyState === ws.OPEN }

// Send a message to the server

