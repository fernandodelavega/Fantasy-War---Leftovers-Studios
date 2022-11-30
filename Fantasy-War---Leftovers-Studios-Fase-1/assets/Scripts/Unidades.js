export class Unidades
{
    gameobject;

    constructor(vida, ataque, velocidadAtaque, velocidadMovimiento, range, image, sound)
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
        this.sound = sound;
    }
    instance(unidad, positionx, positiony, camino, enemyBase, physics){

        
        this.camino = camino;
        this.enemyBase = enemyBase;
        this.image = unidad.image;
        this.gameobject = physics.add.sprite(positionx, positiony, this.image).setScale(2, 2);
        
        this.gameobject.anims.play(this.image, true);
        
        this.timer = 0;
        this.isDead = false;
        return this;
    }
    setColliding(isColliding){
        this.isColliding = isColliding;
    }
    start(player){
        if(player == 1){
            this.gameobject.setVelocity(this.velocidadMovimiento, 0);
        }
        else if(player == 2){
            this.gameobject.setVelocity(this.velocidadMovimiento, 0);
        }
    }
    stop(){
        this.gameobject.setVelocity(0, 0);
    }
    set(){
        if(this.enemyBase.x < this.gameobject.x){
            this.objectives.sort(function(a, b){
                return (a.gameobject.x - b.gameobject.x);
            })

        }else{
            this.objectives.sort(function(a, b){
                return (b.gameobject.x - a.gameobject.x);
            })
        }
        this.actualEnemy = this.objectives.pop();
        //this.stop();
    }
    Update(delta){
        
        if(this.isDead){
            delete this;
            return;
        }
        //base al alcance
        if(Phaser.Math.Distance.Between(this.gameobject.x, 0, this.enemyBase.collision.x, 0) <= this.range + this.enemyBase.size){
            this.timer += delta / 1000;
            this.stop();
            if(this.timer >= 10 - this.velocidadAtaque){
                this.sound.play();
                this.enemyBase.damage(this.ataque);
                this.timer = 0;
            }
            return;
        }//existe enemigo al alcance
        if(this.actualEnemy != null){
            if(!this.actualEnemy.isDead && this.gameobject.y==this.actualEnemy.gameobject.y){
                this.stop();
                this.timer += delta / 1000;
                if(this.timer >= 10 - this.velocidadAtaque){
                    this.Attack(this.actualEnemy);
                    this.timer = 0;
                }
                return;
            }else{
                this.actualEnemy = null;
                this.restart();
            }
        }
        if(this.objectives.length != 0){
            for (var i = 0; i < this.objectives.length; i++){
                //console.log(Phaser.Math.Distance.Between(this.gameobject.x, 0, this.objectives[i].gameobject.x, 0) <= this.range);
                if(this.enemy == null && Phaser.Math.Distance.Between(this.gameobject.x, 0, this.objectives[i].gameobject.x, 0) <= this.range && this.gameobject.y == this.objectives[i].gameobject.y){
                    this.set();
                    return;
                }
            }
        }else{
            this.restart();
        }

    }
    Attack(enemigo){
        enemigo.vida -= this.ataque;
        this.sound.play();
        this.CheckDead(this.actualEnemy);
        //this.restart();

        this.timer = 0;
    }
    restart(){
        if(this.enemyBase.x < this.gameobject.x){
            this.start(2);
        }else{
            this.start(1);
        }
    }
    CheckDead(enemy){
        if(enemy.vida<=0){
        enemy.gameobject.body.enable = false;
        enemy.gameobject.destroy();
        this.actualEnemy = null;
        enemy.isDead = true;
        delete this;
        this.restart();
        }
        //this.restart();
        //delete(enemy);
    }
}