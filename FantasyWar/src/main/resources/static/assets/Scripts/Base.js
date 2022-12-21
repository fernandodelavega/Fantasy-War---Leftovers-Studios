export class Base
{
    collision;
    isColliding = false;
    constructor(vida, x, y, image, physics, graphics){
        this.graphics = graphics;
        this.collision = physics.add.staticGroup().create(x, y, image).setScale(0.1, 1).refreshBody().setVisible(false);
        this.x = x;
        this.maxVida = vida;
        this.vida = vida;
        this.size = 50;
        this.SetLifeBar(graphics);
    }
    damage(damage){
        this.vida -= damage/10;
        this.SetLifeBar();

    }
    setColliding(isColliding){
        this.isColliding = isColliding;
    }
    SetLifeBar(){
        this.graphics.clear();
        for (var i = 0; i < this.vida; ++i)
        {
            var color = 0xff0000;
            var alpha = 1;
        
            this.graphics.fillStyle(color, alpha);
            if(this.x < 1000){
                this.graphics.fillRect(this.x + 200/this.maxVida * i, 50, 200/this.maxVida, 32);
            }else{
                this.graphics.fillRect(this.x - 200/this.maxVida * i, 50, 200/this.maxVida, 32);
            }
        }
    }
}