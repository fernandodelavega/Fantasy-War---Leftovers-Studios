import{PowerUps} from './PowerUps.js'
export class Heal extends PowerUps{
    vida = 30;
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
    }


}