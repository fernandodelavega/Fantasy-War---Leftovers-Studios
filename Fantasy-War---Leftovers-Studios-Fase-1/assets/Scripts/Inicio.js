
export class Inicio extends Phaser.Scene {
    constructor(){
        super({key: "Inicio"}); //key=nombre escena, active=se ve
       
    }
    preload(){
        
        this.load.image('boton', 'assets/images/fase3/boton_play.png');
        this.load.image('botonCredit', 'assets/images/fase3/boton_credits.png');
        this.load.image('letras', 'assets/images/fase3/fantasy_war_logo.png');
        this.load.image('fondo', 'assets/images/fase3/fondo_personajes.png');
        this.load.spritesheet('fondo2', 'assets/images/fase3/portada.png', { frameWidth: 320, frameHeight: 180 });

        this.load.image('help','assets/images/help.png');
        this.load.image('controles','assets/images/Controles.png');
        this.load.audio('boton1', 'assets/musica/navegar_menu/aceptar.mp3');
        this.load.audio('boton2', 'assets/musica/navegar_menu/cambiar-opcion.mp3');
    }

    
    
    create(){
        
        this.botonI=this.sound.add('boton1');
        this.botonO = this.sound.add('boton2');
        this.fondo = this.add.sprite(1920/2, 1080/2, 'fondo2').setScale(6, 6) ;
        this.anims.create({
            key: 'back',
            frames: this.anims.generateFrameNumbers('fondo2', { start: 0, end: 1 }),
            frameRate: 30,
            repeat: -1
        });
        this.fondo.anims.play('back');
        this.add.image(1920/2, 1080/2, 'fondo').setScale(6, 6);
        this.add.image(1920/2, 1080/3, 'letras').setScale(18, 18);



        
        //this.add.image(960  , 540, 'inicio');
        //this.musica.play();
        this.boton= this.add.image(950, 780, 'boton').setScale(6,6).setInteractive();
        this.boton.on('pointerdown', () =>{
            this.botonI.play();
            this.scene.start('GameScene');  
        });
        this.botonC= this.add.image(950, 920, 'botonCredit').setScale(6,6).setInteractive();
        this.botonC.on('pointerdown', () =>{
            this.botonI.play();
            this.scene.start('credits');  
        });

        
        var c = 0;
        var controles;
        controles = this.add.image();

        this.boton1= this.add.image(1800, 100, 'help').setScale(5,5).setInteractive();
        this.boton1.on('pointerdown', () =>{
            this.botonO.play();
            if (c == 1){

                this.controles.destroy();
                this.controles = null;
                c = 0;
                console.log('nuked');


            }
            else{

                this.controles = this.add.image(960,540,'controles').setScale(6,6);
                c = 1;
                console.log('cread');

            }

        });

        //this.scene.start("GameScene");
    }
    
    update(){
        
        

    }


}

