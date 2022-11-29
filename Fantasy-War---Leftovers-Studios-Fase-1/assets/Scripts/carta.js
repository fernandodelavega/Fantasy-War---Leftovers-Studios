export class carta{

    constructor(x, y, image, unityImage, physics){
        this.x = x;
        this.y = y;
        this.card = physics.add.image(x, y, image);
        //this.cardtranslucid = physics.add.image(x, y, image).setColor(100, 255, 0, 0);

        this.unity = physics.add.image(x, y, unityImage).setScale(2, 2);
    }

}