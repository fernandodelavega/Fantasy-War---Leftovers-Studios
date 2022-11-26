export class draw extends Phaser.Scene {
    constructor(){
        super({key: "draw", active: false}); //key=nombre escena, active=se ve
       
    }
    preload(){
        this.load.image('sky', 'assets/images/sky.png');
        this.load.image('botonReinicio', 'assets/images/botonReinicio.png');
        
        
    }
    
    create(){
        
        
        this.add.image(960  , 540, 'sky');
        this.add.text(16, 16, 'HA HABIDO EMPATE', { fontSize: '32px', fill: '#000' });
        this.boton= this.add.image(950, 820, 'botonReinicio').setInteractive();
        this.boton.on('pointerdown', () =>{
            this.scene.start('Inicio');  
        });

        //this.scene.start("GameScene");
    }
    
    update(){
        

    }


}