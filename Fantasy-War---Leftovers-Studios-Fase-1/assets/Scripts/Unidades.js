export class Unidades
{
    gameobject;

    constructor(vida, ataque, velocidadAtaque, velocidadMovimiento, isDistance, image)
    {
        this.vida = vida;
        this.ataque = ataque;
        this.velocidadAtaque = velocidadAtaque;
        this.velocidadMovimiento = velocidadMovimiento;
        this.isDistance = isDistance;
        this.image = image;
    }
    instance(unidad, positionx, positiony, physics){
        this.vida = unidad.vida;
        this.ataque = unidad.ataque;
        this.velocidadAtaque = this.velocidadAtaque;
        this.velocidadMovimiento = unidad.velocidadMovimiento;
        this.isDistance = unidad.isDistance;
        this.gameobject = physics.add.image(positionx, positiony, unidad.image);
        return this;
    }
    setColliding(isColliding){
        this.isColliding = isColliding;
    }
    start(player){
        if(player == 1){
            this.gameobject.setVelocity(100, 0);
        }
        else if(player == 2){
            this.gameobject.setVelocity(-100, 0);
        }
    }
    stop(){
        this.gameobject.setVelocity(0, 0);
    }
}