export class ChatPannel{
    constructor(image, message, physics, scene){
        //this.card = physics.add.image(1920/2, , image).setScale(2, 1);
        this.text1 = scene.add.text(1920/2, 80-60, message[3], {color: '#FFFFFF', align: 'center',  font: "15px 'PS2P'"}).setOrigin(.5);
        this.text2 = scene.add.text(1920/2, 80-40, message[2], {color: '#FFFFFF', align: 'center', font: "15px 'PS2P'"}).setOrigin(.5);
        this.text3 = scene.add.text(1920/2, 80-20, message[1], {color: '#FFFFFF', align: 'center', font: "15px 'PS2P'"}).setOrigin(.5);
        this.text4 = scene.add.text(1920/2, 80, message[0], {color: '#FFFFFF', align: 'center', font: "15px 'PS2P'"}).setOrigin(.5);
    }
    Desapear(){
        this.card?.destroy();
        this.text1.destroy();
        this.text2.destroy();
        this.text3.destroy();
        this.text4.destroy();
    }
}