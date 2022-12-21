export class ChatPannel{
    constructor(image, message, physics, scene){
        this.card = physics.add.image(1000, 200, image).setScale(1, .5);
        this.text = scene.add.text(980, 190, message, {color: '#000000', align: 'center'});
    }
    Desapear(){
        this.card.destroy();
        this.text.destroy();
    }
}