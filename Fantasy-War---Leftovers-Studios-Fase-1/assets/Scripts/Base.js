export class Base
{
    collision;
    constructor(vida, x, y, image, physics){
        
        this.collision = physics.add.staticGroup().create(x, y, image).setScale(0.1, 1).refreshBody().setVisible(false);
        this.x = x;
        this.vida = vida;
    }
    
    getVida()
    {
        this.vida.toString();
    }
    Damage(damage){
        this.vida -= this.vida;
    }
}