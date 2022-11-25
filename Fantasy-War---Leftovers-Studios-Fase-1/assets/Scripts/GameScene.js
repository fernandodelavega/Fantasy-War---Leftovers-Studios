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
        this.load.image('entity', 'assets/images/dude.png');

    }

    create(){
        
        this.fondo = this.add.image(1920/2, 1080/2, 'backGround').setScale(6, 6) ;
        
        this.base1 = new Base(1000, 120, 520, 'pina', this.physics);
        this.player1 = new Player(1000, 0, this.base1, 1);
        
        this.base2 = new Base(1000, 1800, 520, 'pina', this.physics);
        this.player2 = new Player(1000, 0, this.base2, 1);

        this.positions = new Array();
        this.positions.push(260);
        this.positions.push(580);
        this.positions.push(900);

        this.goblin = new Unidades(0, 0, 0, 0, false, 'entity');

        //colliders
        
        //teclado
        this.cursors = this.input.keyboard.createCursorKeys();
        this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.keyEnter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    }
    
    update(){
        
        //controles player 1
        if(Phaser.Input.Keyboard.JustDown(this.keySpace)){
            this.newUnity = this.goblin.instance(this.goblin, this.player1.base.x, this.positions[this.player1.camino], this.physics);
            this.player1.AddUnidad(this.newUnity);
            for (this.i = 0; this.i < this.player2.unidades.length; this.i++){
                this.physics.add.collider(this.player2.unidades[this.i].gameobject, this.newUnity.gameobject, this.collition, null, this);
            }
            this.physics.add.collider(this.player2.base.collision, this.newUnity.gameobject, this.collition, null, this);
            this.newUnity.start(1);
        }
        else if(Phaser.Input.Keyboard.JustDown(this.keyW)){
            this.player1.siguienteCamino(true);
        }
        else if(Phaser.Input.Keyboard.JustDown(this.keyS)){
            this.player1.siguienteCamino(false);
        }
        else{}

        //controles player 2 
        if(Phaser.Input.Keyboard.JustDown(this.keyEnter)){
            this.newUnity = this.goblin.instance(this.goblin, this.player2.base.x, this.positions[this.player2.camino], this.physics);
            this.player2.AddUnidad(this.newUnity);
            for (this.i = 0; this.i < this.player1.unidades.length; this.i++){
                this.physics.add.collider(this.player1.unidades[this.i].gameobject, this.newUnity.gameobject, this.collition, null, this);
            }
            this.physics.add.collider(this.player1.base.collision, this.newUnity.gameobject, this.collition, null, this);
            this.newUnity.start(2);
        } 
        else if(Phaser.Input.Keyboard.JustDown(this.cursors.up)){
            this.player2.siguienteCamino(true);
        }
        else if(Phaser.Input.Keyboard.JustDown(this.cursors.down)){
            this.player2.siguienteCamino(false);
        }
        else{}
    }
    collition(){
        console.log('collition');
    }   
}