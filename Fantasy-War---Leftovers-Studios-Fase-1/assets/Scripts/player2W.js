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
        
        
        this.add.image(1920/2, 1080/2, 'fondo').setScale(6,6);
        this.add.image(1920/2, 300, 'texto').setScale(6,6);
        creditos = this.add.text(1920/2-245, 1000, 'Diego Nicolás Barreales\nAlexander Tercero Moreno\nPascual Gázquez Compán\nFernando de la Vega Valle', { font: 'bold 32px Arial', fill: '#000' });

        this.boton= this.add.image(950, 820, 'botonReinicio').setInteractive();
        this.boton.on('pointerdown', () =>{
            this.scene.start('Inicio');  
        });

        //this.scene.start("GameScene");
    }
    
    update(){
        
        if(creditos.y>450){
            creditos.y--;
        }
    }


}