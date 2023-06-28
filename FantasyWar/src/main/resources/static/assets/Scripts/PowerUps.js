export class PowerUps{
    constructor(physics, image, playerId){
        if(myId == playerId){
            this.image = physics.add.image(1920/2, 1000, image).setScale(6);
        }
        
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
    Effect(playerId){}
}