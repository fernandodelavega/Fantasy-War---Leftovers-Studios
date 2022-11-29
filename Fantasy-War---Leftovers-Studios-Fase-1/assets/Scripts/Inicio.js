var tempoMusica=0;
export class Inicio extends Phaser.Scene {
    constructor(){
        super({key: "Inicio"}); //key=nombre escena, active=se ve
       
    }
    preload(){
        this.load.image('inicio', 'assets/images/inicio.png');
        this.load.image('boton', 'assets/images/boton.png');
        this.load.audio('musicote', 'assets/musica/musicote.mp3');
        this.load.image('help','assets/images/help.png');
        this.load.image('controles','assets/images/Controles.png');
    }

    
    
    create(){
        this.musica=this.sound.add('musicote');
        this.musica.loop = true;
        this.musica.volume = 0.1;
        

        
        this.add.image(960  , 540, 'inicio');
        //this.musica.play();
        this.boton= this.add.image(950, 820, 'boton').setInteractive();
        this.boton.on('pointerdown', () =>{
            this.scene.start('GameScene');  
        });
        
        var c = 0;
        var controles;
        controles = this.add.image();

        this.boton1= this.add.image(1800, 100, 'help').setScale(0.25,0.25).setInteractive();
        this.boton1.on('pointerdown', () =>{

            if (c == 1){

                this.controles.destroy();
                this.controles = null;
                c = 0;
                console.log('nuked');


            }
            else{

                this.controles = this.add.image(960,540,'controles');
                c = 1;
                console.log('cread');

            }

        });

        //this.scene.start("GameScene");
    }
    
    update(delta){
        tempoMusica += delta / 1000;
        if(tempoMusica >= 1){
            this.musica.play();
            
            
        }

    }


}

