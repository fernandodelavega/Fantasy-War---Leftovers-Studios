class Base
{
    constructor(vida, image, positionx, positiony){
        this.vida = vida;
        this.physics.add.staticGroup().create(positionx, positiony, image);
    }
    get()
    {
        this.vida.toString();
    }
}