import {Base} from './Base.js';
import {Player} from './Player.js';
import {Unidades} from './Unidades.js';
import {carta} from './carta.js';

var textOro1;
var textOro2;
var chatText;

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
        this.flechaA = this.add.image(120,560,'flecha1').setScale(0.3,0.3);
        this.flechaB = this.add.image(1800,560,'flecha1').setScale(0.3,0.3);
        this.flechaB.angle +=180;
        this.coin = this.add.sprite(1920/2, 50, 'coin').setScale(6, 6) ;
        textOro1 = this.add.text(1920/2-200, 50, 'oro1: 10',{ fontSize: '32px'});
        textOro2 = this.add.text(1920/2+50, 50, 'oro2: 10',{ fontSize: '32px'});

        this.textInput = this.add.dom(2000, 690).createFromCache("form").setOrigin(0.5);
		this.chat = this.add.text(1000,10,"",{
			lineSpacing: 15,
			backgroundColor: "#21313CDD",
			color: "#26924F",
			padding: 10,
			fontStyle: "bold"
		});
		this.chat.setFixedSize(270,645);
        
        this.tKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
		
		this.tKey.on("down", event =>{
			let chatbox = this.textInput.getChildByName("chat");
			if(chatbox.value != ""){
				
				//POST

				chatbox.value = "";
			}
		});

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
            repeat: 0
        });
        this.anims.create({
            key: 'goblinBAT',
            frames: this.anims.generateFrameNumbers('goblinBA', { start: 0, end: 2 }),
            frameRate: 10,
            repeat: 0
        });
        this.anims.create({
            key: 'magoRAT',
            frames: this.anims.generateFrameNumbers('magoRA', { start: 0, end: 2 }),
            frameRate: 10,
            repeat: 0
        });
        this.anims.create({
            key: 'magoBAT',
            frames: this.anims.generateFrameNumbers('magoBA', { start: 0, end: 2 }),
            frameRate: 10,
            repeat: 0
        });
        this.anims.create({
            key: 'golemRAT',
            frames: this.anims.generateFrameNumbers('golemRA', { start: 0, end: 2 }),
            frameRate: 10,
            repeat: 0
        });
        this.anims.create({
            key: 'golemBAT',
            frames: this.anims.generateFrameNumbers('golemBA', { start: 0, end: 2 }),
            frameRate: 10,
            repeat: 0
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
        
        this.graphics1 = this.add.graphics();
        this.base1 = new Base(100, 120, 520, 'pina', this.physics, this.graphics1);
        this.player1 = new Player(1000, 10, this.base1, 1);
        
        this.graphics2 = this.add.graphics();
        this.base2 = new Base(100, 1800, 520, 'pina', this.physics, this.graphics2);
        this.player2 = new Player(1000, 10, this.base2, 1);
        
        this.positions = new Array();
        this.positions.push(900);
        this.positions.push(580);
        this.positions.push(260);

        this.unidadesPrefab1 = new Array(); 
        this.unidadesPrefab1.push(new Unidades(50, 40, 8, 150, 10, 'goblinR',this.goblinS,'goblinRAT','goblinRHit'));
        this.unidadesPrefab1.push(new Unidades(20, 120, 4, 100, 700, 'magoR',this.mageS,'magoRAT','goblinRHit'));
        this.unidadesPrefab1.push(new Unidades(150, 20, 5, 100, 10, 'golemR',this.golemS,'golemRAT',null));
        
        this.unidadesPrefab2 = new Array(); 
        this.unidadesPrefab2.push(new Unidades(150, 20, 5, -100, 10, 'golemB',this.golemS,'golemBAT',null));
        this.unidadesPrefab2.push(new Unidades(20, 120, 4, -100, 700, 'magoB',this.mageS,'magoBAT','magoBHit'));
        this.unidadesPrefab2.push(new Unidades(50, 40, 8, -150, 10, 'goblinB',this.goblinS,'goblinBAT','goblinBHit'));

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

        
        //chat
        chatText = this.add.text(687, 542, 'a', {fontSize: '35px'});
        this.down = false;

    }

    update(time, delta){

        //controles player 1
        if(Phaser.Input.Keyboard.JustDown(this.keySpace) && this.player1.oro >= 1){
            this.crear.play();
            var newUnity = new Unidades();
            Object.assign(newUnity, this.unidadesPrefab1[this.player1.unidad]);
            newUnity.instance(newUnity, this.player1.base.x, this.positions[this.player1.camino], this.player1.camino, this.player2.base, this.physics);
            this.player1.AddUnidad(newUnity);
            for (var i = 0; i < this.player2.unidades.length; i++){
                //if(newUnity.camino == this.player2.unidades[i].camino){
                if(newUnity.y == this.player2.unidades[i].y){
                    //console.log(newUnity.camino, ', ', this.player2.unidades[i].camino);
                //if(Phaser.Math.Distance.Between(0, newUnity.gameobject.y, 0, this.player2.unidades[i].gameobject.y) < 10){
                    newUnity.objectives.push(this.player2.unidades[i]);
                    this.player2.unidades[i].objectives.push(newUnity);
                }
            }
            newUnity.start(1);
            this.player1.oro--;
            newUnity = null;
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
            this.player1.siguienteUnidad(true);
        }
        else{}

        this.flechaA.setY(this.positions[this.player1.camino]);

        if(Phaser.Input.Keyboard.JustDown(this.keyG)){
            this.player1.base.damage(1);
        }
        
        //controles player 2 
        if(Phaser.Input.Keyboard.JustDown(this.keyEnter)&& this.player2.oro>=1){
            this.crear.play();
            var newUnity = new Unidades();
            Object.assign(newUnity, this.unidadesPrefab2[this.player2.unidad]);
            newUnity.instance(newUnity, this.player2.base.x, this.positions[this.player2.camino], this.player2.camino, this.player1.base, this.physics);
            this.player2.AddUnidad(newUnity);
            for (var i = 0; i < this.player1.unidades.length; i++){
                //if(newUnity.camino == this.player1.unidades[i].camino){
                    if(newUnity.y == this.player1.unidades[i].y){
                    //if(Phaser.Math.Distance.Between(0, newUnity.gameobject.y, 0, this.player1.unidades[i].gameobject.y) < 10){
                    
                    //console.log(newUnity.camino, ', ', this.player1.unidades[i].camino);
                    newUnity.objectives.push(this.player1.unidades[i]);
                    this.player1.unidades[i].objectives.push(newUnity);
                }
            }
            newUnity.start(2);
            this.player2.oro--;
            newUnity = null;
        }
        else if(Phaser.Input.Keyboard.JustDown(this.cursors.up)){
            this.player2.siguienteCamino(true);
            
        }
        else if(Phaser.Input.Keyboard.JustDown(this.cursors.down)){
            this.player2.siguienteCamino(false);
        }
        else if(Phaser.Input.Keyboard.JustDown(this.cursors.left)){
            this.player2.siguienteUnidad(false);
        }
        else if(Phaser.Input.Keyboard.JustDown(this.cursors.right)){
            this.player2.siguienteUnidad(true);
        }

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
        if(this.player1.base.vida <= 0 || this.player2.base.vida <= 0){
            if (this.player1.base.vida <= 0 && this.player2.base.vida > 0){
                this.scene.start('player2W');
            }
            else if (this.player2.base.vida <=0 && this.player1.base.vida > 0){
                this.scene.start('player1W');
            }
            else {
                this.scena.start('draw');
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
        this.player1.Update(delta);
        this.player2.Update(delta);
        textOro1.setText('oro1: ' + this.player1.oro);
        textOro2.setText('oro2: ' + this.player2.oro);

        
        this.ChatKeyboard();
    }
    ChatKeyboard(){
        console.log('a');
        this.input.keyboard.on('keydown', function(event){
            if(this.down){return;}
            this.down = true;
            if(event.keyCode == 8 && chatText.text.length > 0){
                chatText.text = chatText.text.substr(0, chatText.text.length - 1);
            }
            else if(event.keyCode == 32 ^ (event.keyCode >= 48 && event.keyCode <= 90)){
                
                    chatText.text += event.key;
                    console.log(chatText);

            }
        })
        this.input.keyboard.on('keyup', function(event){
            this.down = false;
        })
    }
}

