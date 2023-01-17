import { GameScene } from "./GameScene";

var connection = new WebSocket('ws://192.168.0.104:8080/echo');
connection.onopen = function () {
    connection.send('Hi');
}
connection.onclose = function () {
    connection.send("Bye");
}
connection.onerror = function(e) {
    console.log("WS error: " + e);
}
connection.onmessage = function(msg) {
    switch(msg){
        case "unidad":
            break;
        case "chat":
            break;
        default:
            
            break;
    }
    console.log("WS message: " + msg.data);
}
function sendMessage(message){
    connection.send(message);
}
function Login(user, password){
    connection.send();
}
