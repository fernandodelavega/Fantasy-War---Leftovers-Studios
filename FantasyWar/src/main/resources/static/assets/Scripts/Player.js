import { GameScene } from "./GameScene";

export class Player
{
    base;
    unidades;
    camino
    constructor(name, vida, oro, base, caminoSeleccionado, enemyPlayer, gameScene)
    {
        this.ID = name
        this.vida = vida;
        this.oro = oro;
        this.base = base;
        this.camino = caminoSeleccionado;
        this.unidad = 1;
        this.unidades = new Array();
        this.contador = 0;
        this.enemyPlayer = enemyPlayer;
        this.gameScene = gameScene;
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
            Object.assign(newUnity, this.gameScene.unidadesPrefab1[this.unidad]);
            newUnity.instance(newUnity, this.base.x, this.gameScene.positions[this.camino]-90, this.camino, this.enemyPlayer.base, this.physics);
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
        else if(Phaser.Input.Keyboard.JustDown(this.gameScene.keyW)){
            this.siguienteCamino(true);
            
        }
        else if(Phaser.Input.Keyboard.JustDown(this.gameScene.keyS)){
            this.siguienteCamino(false);
        }
        else if(Phaser.Input.Keyboard.JustDown(this.gameScene.keyA)){
            this.siguienteUnidad(false);
        }
        else if(Phaser.Input.Keyboard.JustDown(this.gameScene.keyD)){
            this.siguienteUnidad(true);
        }
        else if(Phaser.Input.Keyboard.JustDown(this.gameScene.keyT)){
            GameScene.chatEnabled = true;
        }
        else{}
        return;
        //this.gameScene.flechaA.setY(this.positions[this.camino]);
    }
    Update(delta){
        
        this.AddOro(delta);

        if(this.gameScene.chatEnabled){
            return;
        }

        this.InstanciarUnidad();
        return;
    }
}