import {Base} from './Base.js';
import {Player} from './Player.js';
import {Unidades} from './Unidades.js';



export class GameScene extends Phaser.Scene {
    constructor(){
        super({key: "GameScene"}); 
    }
    preload(){
        this.load.image('backGround', 'assets/images/fondo_completo.png');
        this.load.image('pina', 'assets/images/pina.png');
        this.load.spritesheet('goblinR', 'assets/images/tropas/goblin_r.png');
        this.load.spritesheet('magoR', 'assets/images/tropas/mago_r.png');
        this.load.spritesheet('golemR', 'assets/images/tropas/golem_r.png');
        this.load.spritesheet('goblinB', 'assets/images/tropas/goblin_b.png');
        this.load.spritesheet('magoB', 'assets/images/tropas/mago_b.png');
        this.load.spritesheet('golemB', 'assets/images/tropas/golem_b.png');
        this.load.image('flecha1','assets/images/flecha1.png');
        this.load.spritesheet('coin', 'assets/images/tropas/coin.png');

    }

    create(){
        
        this.fondo = this.add.image(1920/2, 1080/2, 'backGround').setScale(6, 6) ;
        this.flechaA = this.add.image(120,560,'flecha1').setScale(0.3,0.3);
        this.flechaB = this.add.image(1800,560,'flecha1').setScale(0.3,0.3);
        this.flechaB.angle +=180;

        this.graphics1 = this.add.graphics();
        this.base1 = new Base(10, 120, 520, 'pina', this.physics, this.graphics1);
        this.player1 = new Player(1000, 0, this.base1, 1);
        
        this.graphics2 = this.add.graphics();
        this.base2 = new Base(10, 1800, 520, 'pina', this.physics, this.graphics2);
        this.player2 = new Player(1000, 0, this.base2, 1);

        this.positions = new Array();
        this.positions.push(900);
        this.positions.push(580);
        this.positions.push(260);

        this.unidadesPrefab1 = new Array(); 
        this.unidadesPrefab1.push(new Unidades(50, 40, 8, 150, 10, 'goblin_r'));
        this.unidadesPrefab1.push(new Unidades(20, 120, 6, 100, 100, 'mago_r'));
        this.unidadesPrefab1.push(new Unidades(150, 20, 5, 100, 10, 'golem_r'));
        
        this.unidadesPrefab2 = new Array(); 
        this.unidadesPrefab2.push(new Unidades(50, 40, 8, 150, 10, 'goblin_b'));
        this.unidadesPrefab2.push(new Unidades(20, 120, 6, 100, 100, 'mago_b'));
        this.unidadesPrefab2.push(new Unidades(150, 20, 5, 100, 10, 'golem_b'));

        //teclado
        this.cursors = this.input.keyboard.createCursorKeys();
        this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.keyEnter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keyG = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.G);
        this.keyH = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.H);
    }
    update(time, delta){

        console.log(time);
        console.log(delta);
        //controles player 1
        if(Phaser.Input.Keyboard.JustDown(this.keySpace)&& this.player1.oro>=1){
            this.newUnity = new Unidades();
            Object.assign(this.newUnity, this.goblin);
            this.newUnity.instance(this.unidadesPrefab1[this.player1.unidad], this.player1.base.x, this.positions[this.player1.camino], this.player1.camino, this.player2.base, this.physics);
            this.player1.AddUnidad(this.newUnity);
            for (var i = 0; i < this.player2.unidades.length; i++){
                if(this.player1.camino == this.player2.unidades[i].camino){
                    this.newUnity.objectives.push(this.player2.unidades[i]);
                    this.player2.unidades[i].objectives.push(this.newUnity);
                }
            }
            this.newUnity.start(1);
            console.log(this.player1.unidades);
            this.player1.oro--;
        }
        else if(Phaser.Input.Keyboard.JustDown(this.keyW)){
            this.player1.siguienteCamino(true);
            
        }
        else if(Phaser.Input.Keyboard.JustDown(this.keyS)){
            this.player1.siguienteCamino(false);
        }
        else if(Phaser.Input.Keyboard.JustDown(this.keyA)){
            this.player1.siguienteUnidad(false);
        }
        else if(Phaser.Input.Keyboard.JustDown(this.keyD)){
            this.player1.siguienteUnidad(false);
        }
        else{}

        this.flechaA.setY(this.positions[this.player1.camino]);

        if(Phaser.Input.Keyboard.JustDown(this.keyG)){
            this.player1.base.damage(1);
        }
        
        //controles player 2 
        if(Phaser.Input.Keyboard.JustDown(this.keyEnter)&& this.player2.oro>=1){
            this.newUnity = new Unidades();
            Object.assign(this.newUnity, this.goblin)
            this.newUnity.instance(this.unidadesPrefab2[this.player2.unidad], this.player2.base.x, this.positions[this.player2.camino], this.player2.camino, this.player1.base, this.physics);
            this.player2.AddUnidad(this.newUnity);
            for (var i = 0; i < this.player1.unidades.length; i++){
                if(this.player2.camino == this.player1.unidades[i].camino){
                    this.newUnity.objectives.push(this.player1.unidades[i]);
                    this.player1.unidades[i].objectives.push(this.newUnity);
                }
            }
            this.newUnity.start(2);
            console.log(this.player2.unidades);
            this.player2.oro--;
        }
        else if(Phaser.Input.Keyboard.JustDown(this.cursors.up)){
            this.player2.siguienteCamino(true);
            
        }
        else if(Phaser.Input.Keyboard.JustDown(this.cursors.down)){
            this.player2.siguienteCamino(false);
        }
        else{}

        this.flechaB.setY(this.positions[this.player2.camino]);

        if(Phaser.Input.Keyboard.JustDown(this.keyH)){
            this.player2.base.damage(1);
        }



        ////Recorrer todos los objetos que interactuan y poner collition a false
        //for (var i = 0; i < this.player1.unidades.length; i++){
        //    this.player1.unidades[i].setColliding(false);
        //}
        //for (var i = 0; i < this.player2.unidades.length; i++){
        //    this.player2.unidades[i].setColliding(false);
        //}
        //this.player1.base.setColliding(false);
        //this.player2.base.setColliding(false);
        //
        //
        ////colisiones entre unidades del jugador 1 con el 2
        //for (var i = 0; i < this.player1.unidades.length; i++){
        //    for(var j=0; j < this.player1.unidades[i].objectives.length; j++){
        //    
        //    
        //        if(Math.abs(this.player1.unidades[i].x-this.player1.unidades[i].objectives[j].x)<=this.player1.unidades[i].range){
        //            this.player1.unidades[i].stop();
        //            this.player1.unidades[i].objectives[j].stop();
        //            this.player1.unidades[i].Atack(this.player1.unidades[i],this.player1.unidades[i].objectives[j]);
        //            if(this.player1.unidades[i].objectives[j].vida<=0){
        //
        //                //eliminar el objetivo de todos los arrays donde está y deshabilitarlo con this.player1.unidades[i].objectives[j].disableBody(true, true);
        //                this.player1.unidades[i].stack=0;
        //                this.player1.unidades[i].start(1);
        //            }
        //        }
        //    }
        //
        //}
        //
        ////colisiones entre unidades del jugador 2 con el 1
        //for (var i = 0; i < this.player2.unidades.length; i++){
        //    for(var j=0; j < this.player2.unidades[i].objectives.length; j++){
        //    
        //    
        //        if(Math.abs(this.player2.unidades[i].x-this.player2.unidades[i].objectives[j].x)<=this.player2.unidades[i].range){
        //            this.player2.unidades[i].stop();
        //            this.player2.unidades[i].objectives[j].stop();
        //            this.player2.unidades[i].Atack(this.player2.unidades[i],this.player2.unidades[i].objectives[j]);
        //            if(this.player2.unidades[i].objectives[j].vida<=0){
        //                //eliminar el objetivo de todos los arrays donde está y deshabilitarlo con this.player1.unidades[i].objectives[j].disableBody(true, true);
        //                this.player2.unidades[i].stack=0;
        //                this.player2.unidades[i].start(2);
        //            }
        //        }
        //    }
        //
        //}

        //Finalizar escena
        if(this.player1.base.vida==0 || this.player2.base.vida==0){
            if (this.player1.base.vida==0 && this.player2.base.vida>0){
                this.scene.start('player2W');
            }
            else if (this.player2.base.vida==0 && this.player1.base.vida>0){
                this.scene.start('player1W');
            }
            else {
                this.scena.start('draw');
            }
        }
        for(var i = 0; i < this.player1.unidades.length; i++){
            this.player1.unidades[i].Update(delta);
        }
        for(var i = 0; i < this.player2.unidades.length; i++){
            this.player2.unidades[i].Update(delta);
        }
    }    
}

