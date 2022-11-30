
export class Inicio extends Phaser.Scene {
    constructor(){
        super({key: "Inicio"}); //key=nombre escena, active=se ve
       
    }
    preload(){
        this.load.image('inicio', 'assets/images/inicio.png');
        this.load.image('boton', 'assets/images/boton.png');
        
        this.load.image('help','assets/images/help.png');
        this.load.image('controles','assets/images/Controles.png');
        this.load.audio('boton1', 'assets/musica/navegar_menu/aceptar.mp3');
        this.load.audio('boton2', 'assets/musica/navegar_menu/cambiar-opcion.mp3');
    }

    
    
    create(){
        
        this.botonI=this.sound.add('boton1');
        this.botonO=this.sound.add('boton2');

        
        this.add.image(960  , 540, 'inicio');
        //this.musica.play();
        this.boton= this.add.image(950, 820, 'boton').setInteractive();
        this.boton.on('pointerdown', () =>{
            this.botonI.play();
            this.scene.start('GameScene');  
        });
        
        var c = 0;
        var controles;
        controles = this.add.image();

        this.boton1= this.add.image(1800, 100, 'help').setScale(0.25,0.25).setInteractive();
        this.boton1.on('pointerdown', () =>{
            this.botonO.play();
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
    
    update(){
        
        

    }


}

