import {Base} from './Base.js';
import {Player} from './Player.js';
import {Unidades} from './Unidades.js';
import {carta} from './carta.js';
import { ChatPannel } from './ChatPannel.js';
import { Espectator } from './espectator.js';

var textOro1;
var textOro2;
var chatText;

var newMessage;
var chatEnabled = false;
var chatMessages = [];

export class GameScene extends Phaser.Scene {
    constructor(){
        super({key: "GameScene"});
    }
    preload(){
        this.load.image('backGround', 'assets/images/fase3/fondo_completo.png');
        this.load.image('pina', 'assets/images/pina.png');
        this.load.image('flecha1','assets/images/flecha1.png');
        this.load.image('carta', 'assets/images/carta.png');

        this.load.spritesheet('goblinR', 'assets/images/tropas/goblin_r.png', { frameWidth: 35, frameHeight: 35 });
        this.load.spritesheet('magoR', 'assets/images/tropas/mage_r.png', { frameWidth: 35, frameHeight: 35 });
        this.load.spritesheet('golemR', 'assets/images/tropas/golem_r.png', { frameWidth: 45, frameHeight: 45 });
        this.load.spritesheet('goblinB', 'assets/images/tropas/goblin_b.png', { frameWidth: 35, frameHeight: 35 });
        this.load.spritesheet('magoB', 'assets/images/tropas/mage_b.png', { frameWidth: 35, frameHeight: 35 });
        this.load.spritesheet('golemB', 'assets/images/tropas/golem_b.png', { frameWidth: 45, frameHeight: 45 });
        this.load.spritesheet('coin', 'assets/images/tropas/coin.png', { frameWidth: 20, frameHeight: 20 });
        
        this.load.spritesheet('goblinRA', 'assets/images/fase3/goblinRAt.png', { frameWidth: 35, frameHeight: 35 });
        this.load.spritesheet('magoRA', 'assets/images/fase3/magoRAt.png', { frameWidth: 35, frameHeight: 35 });
        this.load.spritesheet('golemRA', 'assets/images/fase3/golemRAt.png', { frameWidth: 45, frameHeight: 45 });
        this.load.spritesheet('goblinBA', 'assets/images/fase3/goblinBAt.png', { frameWidth: 35, frameHeight: 35 });
        this.load.spritesheet('magoBA', 'assets/images/fase3/magoBAt.png', { frameWidth: 35, frameHeight: 35 });
        this.load.spritesheet('golemBA', 'assets/images/fase3/golemBAt.png', { frameWidth: 45, frameHeight: 45 });
        
        this.load.spritesheet('goblinRH', 'assets/images/fase3/tajo_r.png', { frameWidth: 35, frameHeight: 35 });
        this.load.spritesheet('magoRH', 'assets/images/fase3/explosion_r.png', { frameWidth: 35, frameHeight: 35 });
        this.load.spritesheet('goblinBH', 'assets/images/fase3/tajo_b.png', { frameWidth: 35, frameHeight: 35 });
        this.load.spritesheet('magoBH', 'assets/images/fase3/explosion_b.png', { frameWidth: 35, frameHeight: 35 });


        this.load.audio('Crear', 'assets/musica/tropas/poner-tropa.mp3');
        this.load.audio('Matar', 'assets/musica/tropas/tropa-muere.mp3');
        
        this.load.audio('goblinS', 'assets/musica/tropas/goblin-slash.mp3');
        this.load.audio('mageS', 'assets/musica/tropas/mago-explosion.mp3');
        this.load.audio('golemS', 'assets/musica/tropas/golem-golpe.mp3');
    }

    create(){
        
        this.fondo = this.add.image(1920/2, 1080/2, 'backGround').setScale(6, 6);
        this.flechaA = this.add.image(50,560,'flecha1').setScale(2,2);
        this.flechaB = this.add.image(1870,560,'flecha1').setScale(2,2);
        this.flechaB.angle += 180;

        this.coin = this.add.sprite(90, 110, 'coin').setScale(2.5, 2.5);
        this.coin2 = this.add.sprite(1830, 110, 'coin').setScale(2.5, 2.5);
        textOro1 = this.add.text(120, 100, 'GOLD: 10', { font: "20px 'PS2P'"});
        textOro2 = this.add.text(1645, 100, 'GOLD: 10', { font: "20px 'PS2P'" });

        //this.textInput = this.add.dom(1920, 1080).setOrigin(1);
		//this.chat = this.add.text(1000,10,"",{
		//	lineSpacing: 15,
		//	backgroundColor: "#21313CDD",
		//	color: "#26924F",
		//	padding: 10,
		//	fontStyle: "bold"
		//});
		//this.chat.setFixedSize(270,645);
        
        //this.tKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
		
		//this.tKey.on("down", event =>{
		//	let chatbox = this.textInput.getChildByName("chat");
		//	if(chatbox != ""){
		//		
		//		//POST
//
		//		chatbox.value = "";
		//	}
		//});

        this.crear=this.sound.add('Crear');
        this.muerte=this.sound.add('Matar');
        this.goblinS=this.sound.add('goblinS');
        this.mageS=this.sound.add('mageS');
        this.golemS=this.sound.add('golemS');
        //this.coin.anims.add('idle',('coin',{ start: 0, end: 3 }),10,-1);
        //this.coin.anims.play('idle');
        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('coin', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });
        this.coin.anims.play('idle');
        this.coin2.anims.play('idle');
        //animaciones personajes
        this.anims.create({
            key: 'goblinR',
            frames: this.anims.generateFrameNumbers('goblinR', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'goblinB',
            frames: this.anims.generateFrameNumbers('goblinB', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'magoR',
            frames: this.anims.generateFrameNumbers('magoR', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'magoB',
            frames: this.anims.generateFrameNumbers('magoB', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'golemR',
            frames: this.anims.generateFrameNumbers('golemR', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'golemB',
            frames: this.anims.generateFrameNumbers('golemB', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'goblinRAT',
            frames: this.anims.generateFrameNumbers('goblinRA', { start: 0, end: 2 }),
            frameRate: 10,
            repeat: 1
        });
        this.anims.create({
            key: 'goblinBAT',
            frames: this.anims.generateFrameNumbers('goblinBA', { start: 0, end: 2 }),
            frameRate: 10,
            repeat: 1
        });
        this.anims.create({
            key: 'magoRAT',
            frames: this.anims.generateFrameNumbers('magoRA', { start: 0, end: 2 }),
            frameRate: 10,
            repeat: 1
        });
        this.anims.create({
            key: 'magoBAT',
            frames: this.anims.generateFrameNumbers('magoBA', { start: 0, end: 2 }),
            frameRate: 10,
            repeat: 1
        });
        this.anims.create({
            key: 'golemRAT',
            frames: this.anims.generateFrameNumbers('golemRA', { start: 0, end: 2 }),
            frameRate: 10,
            repeat: 1
        });
        this.anims.create({
            key: 'golemBAT',
            frames: this.anims.generateFrameNumbers('golemBA', { start: 0, end: 2 }),
            frameRate: 10,
            repeat: 1
        });

        this.anims.create({
            key: 'goblinRHit',
            frames: this.anims.generateFrameNumbers('goblinRH', { start: 0, end: 2 }),
            frameRate: 10,
            repeat: 0
        });
        this.anims.create({
            key: 'goblinBHit',
            frames: this.anims.generateFrameNumbers('goblinBH', { start: 0, end: 2 }),
            frameRate: 10,
            repeat: 0
        });
        this.anims.create({
            key: 'magoRHit',
            frames: this.anims.generateFrameNumbers('magoRH', { start: 0, end: 2 }),
            frameRate: 10,
            repeat: 0
        });
        this.anims.create({
            key: 'magoBHit',
            frames: this.anims.generateFrameNumbers('magoBH', { start: 0, end: 2 }),
            frameRate: 10,
            repeat: 0
        });
        
        this.cardsP1 = new Array();
        this.cardsP1.push(this.carta1P1 = new carta(1920/8, 1000, 'carta', 'goblinR', this.physics, 0));
        this.cardsP1.push(this.carta2P1 = new carta((1920/8)*2, 1000, 'carta', 'magoR', this.physics, 1));
        this.cardsP1.push(this.carta3P1 = new carta((1920/8)*3, 1000, 'carta', 'golemR', this.physics, 2));
        
        this.cardsP2 = new Array();
        this.cardsP2.push(this.carta3P2 = new carta((1920/8)*7, 1000, 'carta', 'goblinB', this.physics, 2));
        this.cardsP2.push(this.carta2P2 = new carta((1920/8)*6, 1000, 'carta', 'magoB', this.physics, 1));
        this.cardsP2.push(this.carta1P2 = new carta((1920/8)*5, 1000, 'carta', 'golemB', this.physics, 0));
        
        this.positions = new Array();
        this.positions.push(900);
        this.positions.push(580);
        this.positions.push(260);

        this.unidadesPrefab1 = new Array(); 
        this.unidadesPrefab1.push(new Unidades(50, 40, 8, 150, 10, 'goblinR',this.goblinS,'goblinRAT','goblinRHit'));
        this.unidadesPrefab1.push(new Unidades(20, 150, 4, 100, 700, 'magoR',this.mageS,'magoRAT','goblinRHit'));
        this.unidadesPrefab1.push(new Unidades(150, 20, 5, 100, 10, 'golemR',this.golemS,'golemRAT',null));
        
        this.unidadesPrefab2 = new Array(); 
        this.unidadesPrefab2.push(new Unidades(150, 20, 5, -100, 10, 'golemB',this.golemS,'golemBAT',null));
        this.unidadesPrefab2.push(new Unidades(20, 120, 4, -100, 700, 'magoB',this.mageS,'magoBAT','magoBHit'));
        this.unidadesPrefab2.push(new Unidades(50, 40, 8, -150, 10, 'goblinB',this.goblinS,'goblinBAT','goblinBHit'));

        this.espectators = new Array();

        this.graphics1 = this.add.graphics();
        this.base1 = new Base(100, 120, 520, 'pina', this.physics, this.graphics1);
        //this.player1 = new Player(1000, 10, this.base1, 1);
        //this.addPlayer(1);

        this.graphics2 = this.add.graphics();
        this.base2 = new Base(100, 1800, 520, 'pina', this.physics, this.graphics2);
        //this.player2 = new Player(1000, 10, this.base2, 1);
        //this.addPlayer(2);


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
        this.keyT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.T);


        
        //chat
        // chatText = this.add.text(800, 700, '', {fontFamily: 'PS2P'});
        // this.down = false;

        // this.currentMessage = '';
        this.timer = 0;
        gamescene = this;

    }

    update(time, delta){
        
        //if()
        //Finalizar escena
        if(this.player1.base.vida <= 0 || this.player2.base.vida <= 0){
            this.player1.unidades = [];
            this.player2.unidades = [];
            this.player1.oro = 5;
            this.player2.oro = 5;
            if (this.player1.base.vida <= 0 && this.player2.base.vida > 0){
                this.player1.base.vida = 100;
                this.player2.base.vida = 100;
                this.scene.start('player2W');
            }
            else if (this.player2.base.vida <=0 && this.player1.base.vida > 0){
                this.player1.base.vida = 100;
                this.player2.base.vida = 100;
                this.scene.start('player1W');
            }
            else {
                this.player1.base.vida = 100;
                this.player2.base.vida = 100;
                this.scene.start('draw');
            }
        }

        ///////Update Unidades /////
        for(var i = 0; i < this.player1.unidades.length; i++){
            if(this.player1.unidades[i].isDead){
                this.muerte.play();
                this.player1.unidades.splice(i, 1)
                ////
                for(var i = 0; i < this.player2.unidades.length; i++){
                    for(var j = 0; j < this.player2.unidades[i].objectives.length; j++){
                        if(this.player2.unidades[i].objectives[j].isDead){
                            this.player2.unidades[i].objectives.splice(j, 1);
                        }
                    }
                }
                ////
            }
            if(i < this.player1.unidades.length){
                this.player1.unidades[i].Update(delta);
            }
        }
        for(var i = 0; i < this.player2.unidades.length; i++){
            if(this.player2.unidades[i].isDead){
                this.muerte.play();
                this.player2.unidades.splice(i, 1)
                ////
                for(var i = 0; i < this.player1.unidades.length; i++){
                    for(var j = 0; j < this.player1.unidades[i].objectives.length; j++){
                        if(this.player1.unidades[i].objectives[j].isDead){
                            this.player1.unidades[i].objectives.splice(j, 1);
                        }
                    }
                }
                ////
            }
            if(i < this.player2.unidades.length){
                this.player2.unidades[i].Update(delta);
            }
        }
        for (var i = 0; i < this.cardsP1.length; i++){
            this.cardsP1[i].update(this.player1.unidad)
        }
        for (var i = 0; i < this.cardsP2.length; i++){
            this.cardsP2[i].update(this.player2.unidad)
        }

        //update players
        if(this.player1.id==myId){
            this.player1.update(delta);
        }else if (this.player2.id==myId){
            this.player2.update(delta);
        }
        
        //this.player2.Update(delta);
        
        //this.player1.Update(delta);
        textOro1.setText('GOLD: ' + this.player1.oro);
        textOro2.setText('GOLD: ' + this.player2.oro);
        if(this.popUp != undefined){
            this.timer += delta;
            if(this.timer > 500){
                
                this.popUp.Desapear();
                this.popUp = undefined;
                this.timer = 0;
                
            }
        }
        
    }

    
    addPlayer(id) {
        if(this.player1 == undefined){
            this.player1 = new Player(id, 100, 5, this.base1, 1, this.unidadesPrefab1, this.player2, this, this.flechaA);
            try{
            this.player2.enemyPlayer = this.player1;
            }catch{}
        }
        else if(this.player2 == undefined){
            this.player2 = new Player(id, 100, 5, this.base2, 1, this.unidadesPrefab2, this.player1, this, this.flechaB);
            try{
            this.player1.enemyPlayer = this.player2;
            }catch{}
        }
        else {
            this.espectators.push(new Espectator(id));
        }
    }

    ReceiveMessage(message) {
        console.log("recivido)");
        this.popUp = new ChatPannel('carta', message, this.physics, this);
        
    }

}


// function LoadMessage(callback) {
// 	$.ajax({
//     method:"GET",
//     url:"http://localhost:8080/chat",
//     processData:false,
//     headers:{"Content-Type":"application/json"}
//     }).done(function(message) {
//         newMessage = message[message.length - 1];
//     })
// }

// //Crear un usuario
// function CreateMessage(message) {
//     $.ajax({
//     method:"POST",
//     url:"http://localhost:8080/chat",
//     data:JSON.stringify(message),
//     processData:false,
//     headers:{"Content-Type":"application/json"}
//     }).done(function(message) {
// 		console.log(message)
//     })
// }

