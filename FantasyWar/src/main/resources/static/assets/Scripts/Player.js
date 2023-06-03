import { GameScene } from "./GameScene.js";
import { Unidades } from "./Unidades.js";
import "./WebSocketConfig.js";

var chatText;

var playerState = 0;
export class Player
{
    base;
    unidades;
    camino;
    constructor(name, vida, oro, base, caminoSeleccionado, unidadesPref, enemyPlayer, gameScene, flecha)
    {
        this.id = name
        this.vida = vida;
        this.oro = oro;
        this.base = base;
        this.camino = caminoSeleccionado;
        this.unidad = 1;
        this.unidades = new Array();
        this.unidadesPrefab = unidadesPref;
        this.contador = 0;
        this.enemyPlayer = enemyPlayer;
        this.gameScene = gameScene;
        this.flecha = flecha;
        //this.playerState = playerDefault;
        chatText = this.gameScene.add.text(800, 700, '', {fontFamily: 'PS2P'});
    }
    AddUnidad(nuevaUnidad){
        this.unidades.push(nuevaUnidad);
    }
    
    siguienteCamino(isUp){
        if(isUp){

            this.camino = (this.camino + 1) % 3;
            this.flecha.setY(this.gameScene.positions[this.camino]);
        }
        else if(!isUp){
            
            this.camino = (this.camino - 1 < 0)? 3 - this.camino - 1 : (this.camino - 1) % 3;
            this.flecha.setY(this.gameScene.positions[this.camino]);
        }
    }
    siguienteUnidad(isRight){
        if(isRight){
            this.unidad = (this.unidad + 1) % 3;
        }
        else if(!isRight){
            this.unidad = (this.unidad - 1 < 0)? 3 - this.unidad - 1 : (this.unidad - 1) % 3;
        }
    }
    AddOro(delta){
        this.contador += delta / 1000;
        if(this.contador >= 2){
            this.oro++;
            this.contador = 0;
        }
    }
    InstanciarUnidad(){

        if(Phaser.Input.Keyboard.JustDown(this.gameScene.keySpace) && this.oro >= 1 && !this.chatEnabled){
            
            var player;
            var newUnidad = this.unidad;
            var camino = this.camino;
            if(this.gameScene.player1.id == myId){
                player = 1;
                newUnidad = this.unidad;
                camino = this.camino;
                var unidad = {
                    player: player,
                    numUnidad: newUnidad,
                    road: camino
                }
                SendMessage("unidad", JSON.stringify(unidad));//newUnity.instance(newUnity, this.base.x, this.gameScene.positions[this.camino]-90, this.camino, this.enemyPlayer.base, this.gameScene.physics);
            }
            else if(this.gameScene.player2.id == myId){
                player = 2;
                newUnidad = this.unidad;
                camino = this.camino;
                var unidad = {
                    player: player,
                    numUnidad: newUnidad,
                    road: camino
                }
                SendMessage("unidad", JSON.stringify(unidad));//newUnity.instance(newUnity, this.base.x, this.gameScene.positions[this.camino]-90, this.camino, this.enemyPlayer.base, this.gameScene.physics);
            }
        }
        else if(Phaser.Input.Keyboard.JustDown(this.gameScene.keyW) && !this.chatEnabled){
            this.siguienteCamino(true);
        }
        else if(Phaser.Input.Keyboard.JustDown(this.gameScene.keyS) && !this.chatEnabled){
            this.siguienteCamino(false);
        }
        else if(Phaser.Input.Keyboard.JustDown(this.gameScene.keyA) && !this.chatEnabled){
            this.siguienteUnidad(false);
        }
        else if(Phaser.Input.Keyboard.JustDown(this.gameScene.keyD) && !this.chatEnabled ){
            this.siguienteUnidad(true);
        }
        else if(Phaser.Input.Keyboard.JustDown(this.gameScene.keyT)){
            playerState = 1;
            
        }
        else{}
        
        return;
    }
    
    ChatKeyboard(){
        this.gameScene.input.keyboard.on('keydown', function(event){
            //if(!this.chatEnabled) {return;}
            //console.log('a');
            if(playerState==0){return;}
            if(this.down){return;}
            this.down = true;
            if(event.keyCode == 8 && chatText.text.length > 0){
                chatText.text = chatText.text.substr(0, chatText.text.length - 1);
                
            }
            else if(event.keyCode == 32 ^ (event.keyCode >= 48 && event.keyCode <= 90)){
                
                chatText.text += event.key;
                console.log(chatText);
                
            }
            else if(event.keyCode == Phaser.Input.Keyboard.KeyCodes.ESC){
                playerState = 0;
                chatText.text = "";
            }
            else if(event.keyCode == 13){
                CreateMessage(chatText.text);
                playerState = 0;
                //this.ReciveMessage(chatText.text);
                chatText.text = "";
            }
            
        })
        this.gameScene.input.keyboard.on('keyup', function(event){
            this.down = false;
        })
    }
    Instanciate(numUnidad, camino){
        this.gameScene.crear.play();
        var newUnity = new Unidades();
        Object.assign(newUnity, this.unidadesPrefab[numUnidad]);

        newUnity.instance(newUnity, this.base.x, this.gameScene.positions[camino]-90, this.camino, this.enemyPlayer.base, this.gameScene.physics);

        this.AddUnidad(newUnity);
        for (var i = 0; i < this.enemyPlayer.unidades.length; i++){
            //if(newUnity.camino == this.player2.unidades[i].camino){
            if(newUnity.y == this.enemyPlayer.unidades[i].y){
                //console.log(newUnity.camino, ', ', this.player2.unidades[i].camino);
            //if(Phaser.Math.Distance.Between(0, newUnity.gameobject.y, 0, this.player2.unidades[i].gameobject.y) < 10){
                newUnity.objectives.push(this.enemyPlayer.unidades[i]);
                this.enemyPlayer.unidades[i].objectives.push(newUnity);
            }
        }
        newUnity.start(1);
        this.oro--;
        newUnity = null;
    }
    

    Update(delta){
        //console.log(playerState);
        this.AddOro(delta);

        // if(GameScene.chatEnabled){
        //     return;
        // }

        
        if(playerState == 0){
            this.InstanciarUnidad();
        }else if(playerState == 1){
            this.ChatKeyboard();
        }

        return;
    }
}
function CreateMessage(text){
    SendMessage("chat", text);
}