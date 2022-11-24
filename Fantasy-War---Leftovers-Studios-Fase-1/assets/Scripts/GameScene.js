import {Base} from './Base.js';
import {Player} from './Player.js';
import {Unidades} from './Unidades.js';

export class GameScene extends Phaser.Scene {
    constructor(){
        super({key: "GameScene"}); 
    }
    preload(){
        this.load.image('backGround', 'assets/images/sky.png');
        this.load.image('pina', 'assets/images/pina.png');
        this.load.image('ground', 'assets/images/platform.png');
    }

    create(){

        this.base1 = new Base(1000, 120, 520, 'pina', this.physics);
        this.base2 = new Base(1000, 1800, 520, 'pina', this.physics);

        this.player1 = new Player(1000, 0, this.base1, 1);
        this.player2 = new Player(1000, 0, this.base2, 1);

        this.caminos = new Array(3);
        for(this.i = 0; this.i < this.caminos.length; this.i++){
            this.caminos[this.i] = this.physics.add.staticGroup().create(600, 100 + 400*this.i, 'ground').setScale(10, 1).refreshBody();
        } 
        //teclado
        this.cursors = this.input.keyboard.createCursorKeys();
        this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    }
    
    update(){
        if(this.keySpace.isDown){
            
        }
    }
}