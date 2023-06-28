import{PowerUps} from './PowerUps.js'
export class Heal extends PowerUps{
    vida = 30;
    SendEffect(){
        super.SendEffect();
    }
    Effect(playerId){
        if(gamescene.player1.id == playerId){
            gamescene.player1.vida = (gamescene.player1.vida + vida >= 100)? 100 : gamescene.player1.vida + vida;
        }
        else if(gamescene.player2.id == playerId){
            gamescene.player2.vida = (gamescene.player2.vida + vida >= 100)? 100 : gamescene.player2.vida + vida;
        }
    }


}