

var boton;

class Inicio extends Phaser.Scene {
    constructor(){
        super({key: "Inicio", active: true}); //key=nombre escena, active=se ve
       
    }
    preload(){
        this.load.image('inicio', 'assets/images/inicio.png');
        this.load.image('boton', 'assets/images/boton.png');
        this.load.audio('musicote', 'assets/musica/musicote.mp3');
        
    }
    
    create(){
        this.musica=this.sound.add('musicote');
        this.musica.loop = true;
        this.musica.volume = 0.1;
        
        
        this.add.image(960  , 540, 'inicio');
        this.musica.play();
        boton= this.add.image(950, 820, 'boton').setInteractive();
        boton.on('pointerdown', () =>{
            this.scene.start('GameScene');  
        });

        //this.scene.start("GameScene");
    }
    
    update(){
        

    }


}

