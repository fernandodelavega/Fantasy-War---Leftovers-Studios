import { GameScene } from "./GameScene.js";
import { Unidades } from "./Unidades.js";

export class Player
{
    base;
    unidades;
    camino
    constructor(name, vida, oro, base, caminoSeleccionado, unidadesPref, enemyPlayer, gameScene)
    {
        this.ID = name
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
        this.chatEnabled = false;
    }
    AddUnidad(nuevaUnidad){
        this.unidades.push(nuevaUnidad);
    }
    
    siguienteCamino(isUp){
        if(isUp){

            this.camino = (this.camino + 1) % 3;
        }
        else if(!isUp){
            
            this.camino = (this.camino - 1 < 0)? 3 - this.camino - 1 : (this.camino - 1) % 3;
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

        if(Phaser.Input.Keyboard.JustDown(this.gameScene.keySpace) && this.oro >= 1){
            this.gameScene.crear.play();
            var newUnity = new Unidades();
            Object.assign(newUnity, this.unidadesPrefab[this.unidad]);
            if(this.ID == 1){
                newUnity.instance(newUnity, this.base.x, this.gameScene.positions[this.camino]-90, this.camino, this.enemyPlayer.base, this.gameScene.physics);
            }
            else if(this.ID == 2){
                newUnity.instance(newUnity, this.base.x, this.gameScene.positions[this.camino]-90, this.camino, this.enemyPlayer.base, this.gameScene.physics);
            }
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
            this.chatEnabled = true;
            
        }
        else{}
        this.gameScene.flechaA.setY(this.gameScene.positions[this.camino]);
        return;
    }
    
    ChatKeyboard(){
        this.gameScene.input.keyboard.on('keydown', function(event){
            if(!this.chatEnabled) {return;}
            console.log('a');
            if(this.down){return;}
            this.down = true;
            if(event.keyCode == 8 && chatText.text.length > 0){
                chatText.text = chatText.text.substr(0, chatText.text.length - 1);
            }
            else if(event.keyCode == 32 ^ (event.keyCode >= 48 && event.keyCode <= 90)){
                
                chatText.text += event.key;
                console.log(chatText);
                
            }
             else if(event.keyCode === Phaser.Input.Keyboard.KeyCodes.ESC){
                 this.chatEnabled = false;
             }
             else if(event.keyCode == 13){
                 CreateMessage(chatText.text);
                 this.chatEnabled = false;
                 //this.ReciveMessage(chatText.text);
                 chatText.text = "";
             }
        })
        this.gameScene.input.keyboard.on('keyup', function(event){
            this.down = false;
        })
    }

    Update(delta){
        console.log(this.chatEnabled);
        this.AddOro(delta);

        // if(GameScene.chatEnabled){
        //     return;
        // }

        this.InstanciarUnidad();
        
        this.ChatKeyboard();
        this.timer += delta;
        if(this.timer > 500){
            if(this.gameScene.popUp != undefined){this.gameScene.popUp.Desapear();}
            LoadMessage();
            if(newMessage != this.gameScene.lastMessage && newMessage != ""){
                if(newMessage == null){ return; }
                this.gameScene.lastMessage = newMessage;
                this.gameScene.popUp = new ChatPannel('carta', newMessage, this.physics, this);
            }
            
            //if(this.newMessage == this.currentMessage){
                
                //this.ReciveMessage(this.newMessage);
                //}
            this.timer = 0;
        }

        return;
    }
}