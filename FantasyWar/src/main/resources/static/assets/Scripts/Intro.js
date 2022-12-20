var tempoIntro=0;
var video;
var playing=false;
export class Intro extends Phaser.Scene {
    constructor(){
        super({key: "Intro", active: true}); //key=nombre escena, active=se ve
       
    }
    preload(){
        this.load.video('intro', 'assets/images/leftOversIntro_with_sound.mp4');
        this.load.audio('musicote', 'assets/musica/música/nivel_1.mp3');
        
        //this.musica.volume = 0.4;
        
        
    }
    
    create(){
        
        
        video= this.add.video(1920/2, 1080/2, 'intro').setScale(2,2);
        this.musica=this.sound.add('musicote');
        this.musica.loop = true;
        this.musica.volume = 0.4;
        //this.scene.start("GameScene");
    }
    
    update(delta){
        
        tempoIntro += delta / 1000;
        //if(tempoIntro >= 1 && playing==false){
            if(playing==false){
                video.play();
                playing=true;
            }
            //playing=true;
            
        //}
        if(tempoIntro > 1300){
            
            this.musica.play();
                
                
            
            this.scene.start('Inicio');
        }
    }


}