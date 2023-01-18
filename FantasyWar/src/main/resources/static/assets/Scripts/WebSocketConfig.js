var gamescene;
var myId;

var socket = new WebSocket("ws://localhost:8080/echo");
socket.onopen = function(event) {
    console.log("Connected to server");
    
    /*
    Json:{
        type: "chat",
        body: "mensaje",
    }
    */
}

socket.onmessage = function(event) {
    console.log("Received message from server: " + event.data);
    if(JSON.parse(event.data).type == "chat"){
        gamescene.ReceiveMessage(JSON.parse(event.data)["body"]);
    }
    if(JSON.parse(event.data).type == "user"){
        gamescene.AddPlayer(JSON.parse(event.data)["body"]);
        if(myId==undefined){
            myId=JSON.parse(event.data)["body"];
        }
    }
}

socket.onclose = function(event) {
    console.log("Disconnected from server");
}

function SendMessage(type, msg){
    console.log(msg);
    socket.send(JSON.stringify({type:type, body: msg}))
}


// Send a message to the server
