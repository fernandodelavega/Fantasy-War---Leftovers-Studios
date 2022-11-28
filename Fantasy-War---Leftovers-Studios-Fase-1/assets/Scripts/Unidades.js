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
        this.camino = camino;
        this.velocidadAtaque = unidad.velocidadAtaque;
        this.velocidadMovimiento = unidad.velocidadMovimiento;
        this.range = unidad.range;
        this.enemyBase = enemyBase;
        this.gameobject = physics.add.image(positionx, positiony, unidad.image);
        this.timer = 0;
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
        //this.objectives.sort()
        this.actualEnemy = enemy;
        this.stop();
    }
    Update(delta){
        //console.log(this.gameobject.x);
        this.timer += delta / 1000;
        if(Phaser.Math.Distance.Between(this.gameobject.x, 0, this.enemyBase.collision.x, 0) <= this.range + this.enemyBase.size){
            this.stop();
            if(this.timer >= 10 - this.velocidadAtaque){
                this.enemyBase.damage(this.ataque);
                this.timer = 0;
            }
            return;
        }
        if(enemys != null){}
        if(this.objectives.some){
            for (var i = 0; i < this.objectives.length; i++){
                console.log(Phaser.Math.Distance.Between(this.gameobject.x, 0, this.objectives[i].gameobject.x, 0) <= this.range);
                if(this.enemy == null && Phaser.Math.Distance.Between(this.gameobject.x, 0, this.objectives[i].gameobject.x, 0) <= this.range){
                    this.set(this.enemy);
                }
            }
        }
    }
    Atack(enemigo){
        enemigo.vida -= this.ataque;
        this.time = 0;
    }
    CheckDead(){
        if(this.vida <= 0){
            delete this;
        }
    }
}