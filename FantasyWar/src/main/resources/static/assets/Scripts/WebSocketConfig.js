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
    console.log("WS message: " + msg.data);
}
