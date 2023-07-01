import { GameScene } from './GameScene.js';
import{PowerUps} from './PowerUps.js'
export class Heal extends PowerUps{
    vida = 30;
    constructor(physics, image, playerId){
        super(physics, image, playerId)
        this.x = (playerId == gamescene.player1.id)? 1920/4 : (1920/4)*3
    }
    SendEffect(){
        super.SendEffect();
    }
    Effect(playerId){
        if(gamescene.player1.id == playerId){
            gamescene.player1.base.Heal(this.vida);
        }
        else if(gamescene.player2.id == playerId){
            gamescene.player2.base.Heal(this.vida);
        }
        super.Effect(playerId);
    }
    


}