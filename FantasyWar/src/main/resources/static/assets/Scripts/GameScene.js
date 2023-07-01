import './WebSocketConfig.js';
import {Base} from './Base.js';
import {Player} from './Player.js';
import {Unidades} from './Unidades.js';
import {carta} from './carta.js';
import { ChatPannel } from './ChatPannel.js';
import { Espectator } from './espectator.js';
import {Nuke} from './Nuke.js';
import {Heal} from './Heal.js';
import {Trade} from './Trade.js';

var textOro1;
var textOro2;
var chatText;

var newMessage;
var chatEnabled = false;
var chatMessages = [];

export class GameScene extends Phaser.Scene {
    started = false;
    constructor(){
        super({key: "GameScene"});
    }
    preload(){
        this.load.image('backGround', 'assets/images/fase3/fondo_completo.png');
        this.load.image('fondoC', 'assets/images/tropas/fondo_sin_caminos.png');
        this.load.image('pina', 'assets/images/pina.png');
        this.load.image('flecha1','assets/images/flecha1.png');
        this.load.image('carta', 'assets/images/carta.png');
        this.load.image('fondoChat', 'assets/images/chat_square.png');
        this.load.image('iconoChat', 'assets/images/chat_icon.png');
        this.load.image('readyNo', 'assets/images/fase3/ready_no.png');
        this.load.image('readyYes', 'assets/images/fase3/ready_yes.png');
        this.load.image('nukeActive', 'assets/images/fase3/pwr_bomb_yes.png');
        this.load.image('nukeInactive', 'assets/images/fase3/pwr_bomb_no.png');
        this.load.image('healActive', 'assets/images/fase3/pwr_heal_yes.png');
        this.load.image('healInactive', 'assets/images/fase3/pwr_heal_no.png');
        this.load.image('tradeActive', 'assets/images/fase3/pwr_coin_yes.png');
        this.load.image('tradeInactive', 'assets/images/fase3/pwr_coin_no.png');
        this.load.image('enterkey', 'assets/images/fase3/enterkey.png')

        this.load.spritesheet('goblinR', 'assets/images/tropas/goblin_r.png', { frameWidth: 35, frameHeight: 35 });
        this.load.spritesheet('magoR', 'assets/images/tropas/mage_r.png', { frameWidth: 35, frameHeight: 35 });
        this.load.spritesheet('golemR', 'assets/images/tropas/golem_r.png', { frameWidth: 45, frameHeight: 45 });
        this.load.spritesheet('goblinB', 'assets/images/tropas/goblin_b.png', { frameWidth: 35, frameHeight: 35 });
        this.load.spritesheet('magoB', 'assets/images/tropas/mage_b.png', { frameWidth: 35, frameHeight: 35 });
        this.load.spritesheet('golemB', 'assets/images/tropas/golem_b.png', { frameWidth: 45, frameHeight: 45 });
        this.load.spritesheet('coin', 'assets/images/tropas/coin.png', { frameWidth: 20, frameHeight: 20 });
        this.load.spritesheet('death', 'assets/images/fase3/death_puff.png', { frameWidth: 35, frameHeight: 35 });
        
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
        gamescene = this;
        console.log(this);
        this.fondo = this.add.image(1920/2, 1080/2, 'backGround').setScale(6, 6);
        this.chatBackground = this.add.image(1920/2, 96, 'fondoChat').setScale(6, 6);
        this.chatIcon = this.add.image(1920/2 + 462, 96, 'iconoChat').setScale(6, 6);
        this.textChat = this.add.text(1920/2 + 360, 42, 'chat', {color: '#FFFFFF', align: 'center', font: "36px 'PS2P'"}).setOrigin(1);

        this.flechaA = this.add.image(50,560,'flecha1').setScale(2,2);
        this.flechaB = this.add.image(1870,560,'flecha1').setScale(2,2);
        this.flechaB.angle += 180;

        this.coin = this.add.sprite(90, 110, 'coin').setScale(2.5, 2.5);
        this.coin2 = this.add.sprite(1830, 110, 'coin').setScale(2.5, 2.5);
        textOro1 = this.add.text(120, 100, 'GOLD: 10', { font: "20px 'PS2P'"});
        textOro2 = this.add.text(1645, 100, 'GOLD: 10', { font: "20px 'PS2P'" });

        

        this.crear=this.sound.add('Crear');
        this.muerte=this.sound.add('Matar');
        this.goblinS=this.sound.add('goblinS');
        this.mageS=this.sound.add('mageS');
        this.golemS=this.sound.add('golemS');
        

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
        this.anims.create({
            key: 'deathAnim',
            frames: this.anims.generateFrameNumbers('death', { start: 0, end: 4 }),
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
        this.unidadesPrefab1.push(new Unidades(50, 40, 8, 150, 100, 'goblinR',this.goblinS,'goblinRAT','goblinRHit', 'death', 'deathAnim'));
        this.unidadesPrefab1.push(new Unidades(20, 150, 4, 100, 700, 'magoR',this.mageS,'magoRAT','goblinRHit', 'death', 'deathAnim'));
        this.unidadesPrefab1.push(new Unidades(150, 20, 5, 100, 100, 'golemR',this.golemS,'golemRAT',null, 'death', 'deathAnim'));
        
        this.unidadesPrefab2 = new Array(); 
        this.unidadesPrefab2.push(new Unidades(150, 20, 5, -100, 100, 'golemB',this.golemS,'golemBAT',null, 'death', 'deathAnim'));
        this.unidadesPrefab2.push(new Unidades(20, 120, 4, -100, 700, 'magoB',this.mageS,'magoBAT','magoBHit', 'death', 'deathAnim'));
        this.unidadesPrefab2.push(new Unidades(50, 40, 8, -150, 100, 'goblinB',this.goblinS,'goblinBAT','goblinBHit', 'death', 'deathAnim'));

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
        this.keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);

        
        this.player1 = new Player(undefined, 100, 5, this.base1, 1, this.unidadesPrefab1, this.player2, this, this.flechaA);
        try{
        this.player2.enemyPlayer = this.player1;
        }catch{}
    
        this.player2 = new Player(undefined, 100, 5, this.base2, 1, this.unidadesPrefab2, this.player1, this, this.flechaB);
        try{
        this.player1.enemyPlayer = this.player2;
        }catch{}
        
        sessionSettings.style.display = "block";
        this.fondoInicio = this.add.image(1920/2, 1080/2, 'fondoC').setScale(6, 6);
        this.newText;
        
        
        this.timer = 0;
        
        
    }
    
    update(time, delta){
        
        
        if(!this.started){
            return;
        }
        //Finalizar escena
        if(this.player1.base.vida <= 0 || this.player2.base.vida <= 0){
            this.SendFinnish((this.player1.base.vida <= 0 && this.player2.base.vida > 0)? this.player2.id :
                    (this.player2.base.vida <=0 && this.player1.base.vida > 0)? this.player1.id :
                    null);
            
        }

        ///////Update Unidades /////
        this.updateUnidadesPlayer1(delta);
        this.updateUnidadesPlayer2(delta);
        
        for (var i = 0; i < this.cardsP1.length; i++){
            this.cardsP1[i].update(this.player1.unidad)
        }
        for (var i = 0; i < this.cardsP2.length; i++){
            this.cardsP2[i].update(this.player2.unidad)
        }
        this.player1.powerUp.Update(delta);
        this.player2.powerUp.Update(delta);
        //update players
        if(this.player1.id==myId){
            this.player1.Update(delta);
        }else if (this.player2.id==myId){
            this.player2.Update(delta);
        }
        
        
        textOro1.setText('GOLD: ' + this.player1.oro);
        textOro2.setText('GOLD: ' + this.player2.oro);
        
    }

    updateUnidadesPlayer1(delta)
    {
        for(var i = 0; i < this.player1.unidades.length; i++){
            if(this.player1.unidades[i].isDead){
                this.DeadPlayer1();
                //mandar mensaje al servidor
            }
            if(i < this.player1.unidades.length){
                this.player1.unidades[i].Update(delta);
            }
        }
    }
    updateUnidadesPlayer2(delta)
    {
        for(var i = 0; i < this.player2.unidades.length; i++){
            if(this.player2.unidades[i].isDead){
                //mandar mensaje al servidor
                this.DeadPlayer2();
            }
            if(i < this.player2.unidades.length){
                this.player2.unidades[i].Update(delta);
            }
        }
    }
    DeadPlayer1(){
        this.muerte.play();
        this.player1.unidades.splice(i, 1)
        for(var i = 0; i < this.player1.unidades.length; i++){
            this.player1.unidades[i].arrayNumber = i;
        }
        ////
        for(var i = 0; i < this.player2.unidades.length; i++){
            for(var j = 0; j < this.player2.unidades[i].objectives.length; j++){
                if(this.player2.unidades[i].objectives[j].isDead){
                    this.player2.unidades[i].objectives.splice(j, 1);
                }
            }
        }
    }
    DeadPlayer2(){
        this.muerte.play();
        this.player2.unidades.splice(i, 1)
        for(var i = 0; i < this.player2.unidades.length; i++){
            this.player2.unidades[i].arrayNumber = i;
        }
        ////
        for(var i = 0; i < this.player1.unidades.length; i++){
            for(var j = 0; j < this.player1.unidades[i].objectives.length; j++){
                if(this.player1.unidades[i].objectives[j].isDead){
                    this.player1.unidades[i].objectives.splice(j, 1);
                }
            }
        }
    }

    addPlayers(player1Name, player1ID, player1Ready, player1PowerUp, player2Name, player2ID, player2Ready, player2PowerUp){
        
        this.player1.name = player1Name;
        this.player1.id = player1ID;
        this.player1.ready = player1Ready;
        this.SelectPowerUp(player1PowerUp, this.player1.id)
        console.log(this.player1.name);
        
        this.player2.name = player2Name;
        this.player2.id = player2ID;
        this.player2.ready = player2Ready;
        this.SelectPowerUp(player2PowerUp, this.player2.id)
        console.log(this.player2.name);

        this.newText?.destroy();
        if(myId != undefined && this.boton == undefined){
            //console.log(myId);
            if(myId == player1ID && this.player1.powerUp != undefined){
                this.boton = this.add.image(950, 780, 'readyNo').setScale(6,6).setInteractive();
                this.boton.on('pointerdown', () =>{
                    this.Ready();
                    SendMessage("userReady", JSON.stringify({playerID: myId, readyStatus: true}));
                });
                
            }
            if(myId == player2ID && this.player2.powerUp != undefined){
                //this.newText = this.add.text(1920/2, 250, "Choose your PowerUp",{color: '#FFFFFF', align: 'center',  font: "60px 'PS2P'"}).setOrigin(.5);
                //this.newText = this.add.text(1920/2, 250, "Choose your PowerUp",{color: '#FFFFFF', align: 'center',  font: "60px 'PS2P'"}).setOrigin(.5)
                this.boton = this.add.image(950, 780, 'readyNo').setScale(6,6).setInteractive();
                this.boton.on('pointerdown', () =>{
                    this.Ready();
                    SendMessage("userReady", JSON.stringify({playerID: myId, readyStatus: true}));
                });
            }
            
            if(this.powerUpButton1 == undefined){
                
                this.powerUpButton1 = this.add.image(500, 400, 'nukeInactive').setScale(6,6).setInteractive();
                this.powerUpButton1.on('pointerdown', () =>{
                    this.powerUpSelected(this.powerUpButton1, "nukeActive", "nukeInactive", 0, 1);
                    SendMessage("SelectPowerUp", JSON.stringify({playerID: myId, powerUpSelected: 1}));
                });
                
                this.powerUpButton2 = this.add.image(950, 400, 'healInactive').setScale(6,6).setInteractive();
                this.powerUpButton2.on('pointerdown', () =>{
                    this.powerUpSelected(this.powerUpButton2, "healActive", "healInactive", 0, 2);
                    SendMessage("SelectPowerUp", JSON.stringify({playerID: myId, powerUpSelected: 2}));
                });
                
                this.powerUpButton3 = this.add.image(1920 - 500, 400, 'tradeInactive').setScale(6,6).setInteractive();
                this.powerUpButton3.on('pointerdown', () =>{
                    this.powerUpSelected(this.powerUpButton3, "tradeActive", "tradeInactive", 0, 3);
                    SendMessage("SelectPowerUp", JSON.stringify({playerID: myId, powerUpSelected: 3}));
                });
            }
        }
        if(myId == this.player1.id){
            this.newText = this.add.text(1920/2, 250, "Choose your PowerUp",{color: '#FFFFFF', align: 'center',  font: "60px 'PS2P'"}).setOrigin(.5)
        }
        
        if(myId == this.player2.id){
            this.newText = this.add.text(1920/2, 250, "Choose your PowerUp",{color: '#FFFFFF', align: 'center',  font: "60px 'PS2P'"}).setOrigin(.5)
        }

        
        if(myId == player1ID && this.player1.powerUp == undefined){
            console.log(this.player1.powerUp);  
            this.boton?.destroy();
            this.boton = undefined;
            this.player1.ready = false;
        }
        if(myId == player2ID && this.player2.powerUp == undefined){
            this.boton?.destroy();
            this.boton = undefined;
            this.player2.ready = false;
        }
        if(this.player1.ready == true && this.player2.ready == true){
            this.Start();
        }
        
    }
    Reset(){
        this.player1.id = undefined;
        this.player2.id = undefined;
        this.player1.name = undefined;
        this.player2.name = undefined;
        this.player1.ready = false;
        this.player2.ready = false;
        this.player1.powerUp = undefined;
        this.player2.powerUp = undefined;
        
        this.player1.unidades = [];
        this.player2.unidades = [];
        this.player1.oro = 5;
        this.player2.oro = 5;
        sent = false;
        this.started = false;
        myId = undefined;
        this.boton = undefined;
        
    }
    ReceiveMessage(message) {
        this.popUp?.Desapear();
        this.popUp = new ChatPannel('carta', message, this.physics, this);
        
    }
    SendFinnish(winner){
        SendMessage("reset", winner)
    }
    FinishGame(winnerId){
        if(winnerId == this.player1.id){
            this.scene.start('player1W');
        }
        else if(winnerId == this.player2.id){
            this.scene.start('player2W');
        }else{
            this.scene.start('draw');
        }
        this.Reset();
        
        this.player1.base.vida = 100;
        this.player2.base.vida = 100;
    }
    Ready(){
        //this.newText = this.add.text(1920/2, 250, "Choose your PowerUp",{color: '#FFFFFF', align: 'center',  font: "60px 'PS2P'"}).setOrigin(.5)
        this.boton.destroy();
        this.boton = this.add.image(950, 780, 'readyYes').setScale(6,6).setInteractive();
        this.boton.on('pointerdown', () =>{
            this.NotReady();
            SendMessage("userReady", JSON.stringify({playerID: myId, readyStatus: false}));
        });
    }
    NotReady(){
        this.boton.destroy();
        this.boton = this.add.image(950, 780, 'readyNo').setScale(6,6).setInteractive();
        this.boton.on('pointerdown', () =>{
            this.Ready();
            SendMessage("userReady", JSON.stringify({playerID: myId, readyStatus: true}));
        });
    }
    powerUpSelected(button, nextButton, currentImage, powerUpSelected, nextSelection){
        console.log(button);
        console.log(button.texture);
        
        
        this.powerUpButton1.setTexture('nukeInactive');
        this.powerUpButton1._events.pointerdown = undefined;
        this.powerUpButton1.on('pointerdown', () =>{
            this.powerUpSelected(this.powerUpButton1, "nukeActive", "nukeInactive", 0, 1);
            SendMessage("SelectPowerUp", JSON.stringify({playerID: myId, powerUpSelected: 1}));
        });
        
        this.powerUpButton2.setTexture('healInactive');
        this.powerUpButton2._events.pointerdown = undefined;
        this.powerUpButton2.on('pointerdown', () =>{
            this.powerUpSelected(this.powerUpButton2, "healActive", "healInactive", 0, 2);
            SendMessage("SelectPowerUp", JSON.stringify({playerID: myId, powerUpSelected: 2}));
        });
        
        this.powerUpButton3.setTexture('tradeInactive');
        this.powerUpButton3._events.pointerdown = undefined;
        this.powerUpButton3.on('pointerdown', () =>{
            this.powerUpSelected(this.powerUpButton3, "tradeActive", "tradeInactive", 0, 3);
            SendMessage("SelectPowerUp", JSON.stringify({playerID: myId, powerUpSelected: 3}));
        });


        button.setTexture(nextButton);
        button._events.pointerdown = undefined;
        button.on('pointerdown', () =>{
            this.powerUpSelected(button, currentImage, nextButton, nextSelection, powerUpSelected);
            SendMessage("SelectPowerUp", JSON.stringify({playerID: myId, powerUpSelected: powerUpSelected}));
        });
    }
    SelectMessage(){
        
    }
    SelectPowerUp(powerUp, playerId){
        if(this.player1.id == playerId){
            this.player1.powerUp = (powerUp == 1)? new Nuke(this.physics, 'nukeInactive', this.player1.id) : (powerUp == 2)? new Heal(this.physics, 'healInactive', this.player1.id) : (powerUp == 3)?new Trade(this.physics, 'tradeInactive', this.player1.id) : undefined;
        }else{
            this.player2.powerUp = (powerUp == 1)? new Nuke(this.physics, 'nukeInactive', this.player2.id) : (powerUp == 2)? new Heal(this.physics, 'healInactive', this.player2.id) : (powerUp == 3)?new Trade(this.physics, 'tradeInactive', this.player2.id) : undefined;
        }
    }
    StartCall(){
        SendMessage();
    }
    Start(){
        this.fondoInicio.destroy();
        this.boton.destroy();
        this.powerUpButton1.destroy();
        this.powerUpButton1 = undefined;
        this.powerUpButton2.destroy();
        this.powerUpButton3.destroy();
        this.newText.destroy();
        this.enterImage = this.physics.add.image(1920/2, 1000, 'enterkey').setScale(6);
        if(myId == this.player1.id){

            this.player1.powerUp.Start();
        }else{

            this.player2.powerUp.Start();
        }
        this.started = true;
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

