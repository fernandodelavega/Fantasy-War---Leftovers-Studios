export class player1W extends Phaser.Scene {
    constructor(){
        super({key: "player1W", active: false}); //key=nombre escena, active=se ve
       
    }
    preload(){
        this.load.image('sky', 'assets/images/sky.png');
        this.load.image('botonReinicio', 'assets/images/botonReinicio.png');
        
        
    }
    
    create(){
        
        
        this.add.image(960  , 540, 'sky');
        this.add.text(16, 16, 'GANA JUGADOR 1', { fontSize: '32px', fill: '#000' });
        this.boton= this.add.image(950, 820, 'botonReinicio').setInteractive();
        this.boton.on('pointerdown', () =>{
            this.scene.start('Inicio');  
        });

        //this.scene.start("GameScene");
    }
    
    update(){
        

    }


}