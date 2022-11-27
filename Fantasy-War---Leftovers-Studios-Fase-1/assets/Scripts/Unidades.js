export class Unidades
{
    gameobject;

    constructor(vida, ataque, velocidadAtaque, velocidadMovimiento, range, image)
    {
        this.vida = vida;
        this.ataque = ataque;
        this.velocidadAtaque = velocidadAtaque;
        this.velocidadMovimiento = velocidadMovimiento;
        this.range = range;
        this.camino;
        this.objectives = new Array(); 
        this.actualEnemy;
        this.image = image;
    }
    instance(unidad, positionx, positiony, camino, enemyBase, physics){
        this.vida = unidad.vida;
        this.ataque = unidad.ataque;
        this.velocidadAtaque = this.velocidadAtaque;
        this.velocidadMovimiento = unidad.velocidadMovimiento;
        this.enemyBase = enemyBase;
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
    set(enemy){
        //console.log(this.objectives);
        this.objectives.sort()
        this.actualEnemy = enemy;
    }
    Update(){
        //console.log(this.gameobject.x);
        if(Phaser.Math.Distance.Between(this.gameobject.x, 0, this.enemyBase.collision.x, 0) <= this.range + this.enemyBase.size){
            this.stop();
        }
        //if(this.objectives.some && this.enemy == null){
        //    this.set(enemy);
        //}
    }
}