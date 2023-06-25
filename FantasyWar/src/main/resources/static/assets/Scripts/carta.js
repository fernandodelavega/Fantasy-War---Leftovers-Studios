export class carta{

    constructor(x, y, image, unityImage, physics, number){
        this.x = x;
        this.y = y;
        this.number = number;
        this.card = physics.add.image(x, y, image);
        this.cardtranslucid = physics.add.image(x, y, image);
        this.cardtranslucid.alpha = 0.5;
        this.cardtranslucid.setTint(0xff0000);
        this.isActive = false;
        this.unity = physics.add.image(x, y, unityImage).setScale(2, 2);
    }
    update(n){
        this.cardtranslucid.visible = false;
        if(n == this.number){
            this.cardtranslucid.visible = true;
        }
    }
    Disable(){
        this.card.setTint(0x444444);
        this.cardtranslucid.setTint(0xff9999);
    }
    Enable(){
        this.card.setTint(0xffffff);
        this.cardtranslucid.setTint(0xff0000);
    }
}