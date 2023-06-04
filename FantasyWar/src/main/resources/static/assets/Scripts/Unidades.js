export class Unidades
{
    gameobject;
    player;
    constructor(vida, ataque, velocidadAtaque, velocidadMovimiento, range, image, sound, atc1, atc2)
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
        this.atc1 = atc1;
        this.atc2 = atc2;
    }
    instance(playerNumber, player, unidad, positionx, positiony, camino, enemyBase, physics, arrayPos){
        
        this.playerNumber = playerNumber;
        this.player = player;
        this.camino = camino;
        this.enemyBase = enemyBase;
        this.image = unidad.image;
        this.gameobject = physics.add.sprite(positionx, positiony, this.image).setScale(6, 6);
        //this.atack = physics.add.sprite(positionx, positiony, this.image).setScale(2, 2);
        this.gameobject.anims.play(this.image, true);
        
        this.timer = 0;
        this.cool = 0;
        this.isDead = false;
        this.arrayNumber = arrayPos;
        return this;
    }
    setColliding(isColliding){
        this.isColliding = isColliding;
    }
    start(player){

        this.gameobject.setVelocity(this.velocidadMovimiento, 0);

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
        if (this.cool>=0.3){
            this.gameobject.anims.play(this.image, true);
        }
        if(this.isDead){
            delete this;
            return;
        }
        this.cool += delta/1000;
        //base al alcance
        if(Phaser.Math.Distance.Between(this.gameobject.x, 0, this.enemyBase.collision.x, 0) <= this.range + this.enemyBase.size){
            this.timer += delta / 1000;
            
            this.stop();
            
            if(this.timer >= 10 - this.velocidadAtaque){
                this.gameobject.anims.play(this.atc1, true);
                this.sound.play();
                
                this.enemyBase.damage(this.ataque);
                this.timer = 0;
                this.cool = 0;
            }if(this.timer >= 0.3 && this.timer <= 10 - this.velocidadAtaque){
            this.gameobject.anims.play(this.image, true);
            }
            return;
        }//existe enemigo al alcance
        if(this.actualEnemy != null){
            if(!this.actualEnemy.isDead && this.gameobject.y==this.actualEnemy.gameobject.y){
                this.stop();
                this.timer += delta / 1000;
                if(this.timer >= 10 - this.velocidadAtaque){
                    this.gameobject.anims.play(this.atc1, true);
                    this.Attack(this.actualEnemy);
                    
                    
                    this.cool = 0;
                    this.timer = 0;
                }if(this.timer >= 0.3 && this.timer <= 10 - this.velocidadAtaque){
                    this.gameobject.anims.play(this.image, true);
                    }
                return;
            }else{
                this.actualEnemy = null;
                this.restart();
                
                if(this.timer >= 0.3 && this.timer <= 10 - this.velocidadAtaque){
                    this.gameobject.anims.play(this.image, true);
                    }
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
        enemy.SendDie();
        this.actualEnemy = null;
        this.restart();
        }
        //this.restart();
        //delete(enemy);
    }
    
    SendDie(){
        if(myId != this.player.id)return;
        var muerteUnidad = {
            player: this.playerNumber,
            position: this.arrayNumber
        }
        
        SendMessage("muerteUnidad", JSON.stringify(muerteUnidad));
    }
    Die(){
        this.gameobject.body.enable = false;
        this.gameobject.destroy();
        this.isDead = true;
    }
}