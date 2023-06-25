export class ChatPannel{
    constructor(image, message, physics, scene){
        this.text1 = scene.add.text(1920/2 - 354, 24, message[2], {color: '#FFFFFF', align: 'center',  font: "15px 'PS2P'"});
        this.text2 = scene.add.text(1920/2 - 354, 72, message[1], {color: '#FFFFFF', align: 'center', font: "15px 'PS2P'"});
        this.text3 = scene.add.text(1920/2 - 354, 120, message[0], {color: '#FFFFFF', align: 'center', font: "15px 'PS2P'"});
    }
    Desapear(){
        this.text1?.destroy();
        this.text2?.destroy();
        this.text3?.destroy();
    }
}