var socket = new WebSocket("ws://localhost:8080/echo");

socket.onopen = function(event) {
    console.log("Connected to server");

    /*
    Json:{
        type: "chat",
        body: "mensaje",
    }
    */
};

socket.onmessage = function(event) {
    console.log("Received message from server: " + event.data);
};

socket.onclose = function(event) {
    console.log("Disconnected from server");
};

function SendMessage(msg){
    console.log(msg);
    socket.send(JSON.stringify({type:"chat", body: msg}))
}
// Send a message to the server
