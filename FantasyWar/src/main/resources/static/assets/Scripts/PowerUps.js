let time = 1000
export class PowerUps{
    cooldownTime = 1000
    constructor(physics, image, playerId){
        this.x = 1920/2;
        this.y = 1080/2;
        this.imageTexture = image;
        if(myId == playerId){
            this.image = physics.add.image(1920/2, 1000, image).setScale(6);

            this.image.visible = false;
        }
        
    }
    Start(){
        this.image.visible = true;
    }
    Disable(){
        this.image.setTint(0x444444);
    }
    Enable(){
        this.image.setTint(0xffffff);
    }
    
    SendEffect(){
        SendMessage("PowerUp", myId)
    }
    Effect(playerId){

        this.effectImage = gamescene.physics.add.image(this.x, this.y, this.imageTexture).setScale(6);
        this.cooldownTime = 0;

    }
    Update(delta){
        this.cooldownTime += delta;
        if(this.cooldownTime >time) this.effectImage?.destroy(); 
    }
}