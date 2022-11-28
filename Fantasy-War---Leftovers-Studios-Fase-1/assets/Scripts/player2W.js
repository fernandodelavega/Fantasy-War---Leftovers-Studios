export class player2W extends Phaser.Scene {
    constructor(){
        super({key: "player2W", active: false}); //key=nombre escena, active=se ve
       
    }
    preload(){
        this.load.image('fondo', 'assets/images/tropas/fondo_sin_caminos.png');
        this.load.image('botonReinicio', 'assets/images/botonRestart.png');
        this.load.image('texto', 'assets/images/tropas/draw2.png');
        
        
    }
    
    create(){
        
        
        this.add.image(0 , 0, 'fondo');
        this.add.image(16, 16, 'texto');
        this.boton= this.add.image(950, 820, 'botonReinicio').setInteractive();
        this.boton.on('pointerdown', () =>{
            this.scene.start('Inicio');  
        });

        //this.scene.start("GameScene");
    }
    
    update(){
        

    }


}