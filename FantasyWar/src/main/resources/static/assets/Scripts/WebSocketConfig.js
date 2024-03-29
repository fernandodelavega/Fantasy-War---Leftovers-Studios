
var gamescene;

var player1PowerUp;

var sessionSettings;
var myId = undefined;
var changeId = false;
var socket = new WebSocket("ws://" + location.host + "/echo");

socket.onopen = function(event) {
    //console.log("Connected to server");
    
    

    sessionSettings = document.getElementById("user")

    //console.log(sessionSettings);
    sessionSettings.style.display = "none";
}

socket.onmessage = function(event) {
    var player1Name, player1ID, player1Ready, player2Name, player2ID, player2Ready;
    //console.log(gamescene);
    console.log("Received message from server: " + event.data);
    if(JSON.parse(event.data).type == "chat"){
        message = [JSON.parse(event.data)["message1"], JSON.parse(event.data)["message2"], JSON.parse(event.data)["message3"], JSON.parse(event.data)["message4"]];
        gamescene.ReceiveMessage(message);
    }
    if(JSON.parse(event.data).type == "user"){
        if(JSON.parse(event.data).player1 == null){
            player1Name = null;
            player1ID = null;
            player1Ready = false; 
            player1PowerUp = null;
        }else{
            player1Name = JSON.parse(event.data).player1.PlayerName;
            player1ID = JSON.parse(event.data).player1.ID;
            player1Ready = JSON.parse(event.data).player1.Ready;
            player1PowerUp = JSON.parse(event.data).player1.powerUp;
        }
        
        if(JSON.parse(event.data).player2 == null){
            player2Name = null;
            player2ID  = null;
            player2Ready = false; 
            player2PowerUp = false;
        }else{
            player2Name = JSON.parse(event.data).player2.PlayerName;
            player2ID  = JSON.parse(event.data).player2.ID;
            player2Ready = JSON.parse(event.data).player2.Ready;
            player2PowerUp = JSON.parse(event.data).player2.powerUp
        }
        if(changeId){
            myId = JSON.parse(event.data).newId;
            changeId = false;
            sessionSettings.style.display = "none";
            console.log(myId)
        }

		gamescene?.addPlayers(player1Name, player1ID, player1Ready, player1PowerUp, player2Name, player2ID, player2Ready, player2PowerUp);
		
        /*gamescene.addPlayer(JSON.parse(event.data)["body"]);
        if(!sent){
            return;
        }
        if(myId == undefined){
            myId=JSON.parse(event.data)["body"];
            sent = false;
        }*/
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
            console.log(gamescene.player1.unidades);
        }else if(JSON.parse(event.data).playerNumber == 2){
            gamescene.player2.unidades[JSON.parse(event.data).arrayPos].Die();
            console.log(gamescene.player2.unidades);
        }
    }
    else if(JSON.parse(event.data).type == "PowerUp"){
        if(JSON.parse(event.data).playerID == gamescene.player1.id){
            gamescene.player1.powerUp.Effect(JSON.parse(event.data).playerID);
        }
        else if(JSON.parse(event.data).playerID == gamescene.player2.id){
            gamescene.player2.powerUp.Effect(JSON.parse(event.data).playerID);
        }
    }
    if(JSON.parse(event.data).type == "winner"){
        gamescene.FinishGame(JSON.parse(event.data).winnerID);
    }
    
}
socket.onclose = function(event) {
    //console.log("Disconnected from server");
}

function SendMessage(type, msg){
    if(type != "oro"){
        console.log(msg);
    }
    if((type == "usuario1" || type == "usuario2") && myId == undefined){
        changeId = true;
    }
    if (!isOpen(socket)) return;
    socket.send(JSON.stringify({type:type, body: msg}));
}
function isOpen(ws) { return ws.readyState === ws.OPEN }

// Send a message to the server

