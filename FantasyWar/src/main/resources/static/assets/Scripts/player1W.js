var creditos;

export class player1W extends Phaser.Scene {
    constructor(){
        super({key: "player1W", active: false}); //key=nombre escena, active=se ve
       
    }
    preload(){
        this.load.image('fondoC', 'assets/images/tropas/fondo_sin_caminos.png');
        this.load.image('botonReinicio', 'assets/images/fase3/boton_restart.png');
        this.load.image('texto1', 'assets/images/tropas/draw1.png');
    }
    
    create(){
        
        this.add.image(1920/2, 1080/2, 'fondoC').setScale(6,6);
        this.add.image(1920 / 2, 1080 / 2, 'texto1').setScale(6, 6);

        this.boton= this.add.image(950, 950, 'botonReinicio').setScale(6,6).setInteractive();
        this.boton.on('pointerdown', () =>{
            this.scene.start('Inicio');  
        });

        //this.scene.start("GameScene");
    }
    
    update(){

    }

}