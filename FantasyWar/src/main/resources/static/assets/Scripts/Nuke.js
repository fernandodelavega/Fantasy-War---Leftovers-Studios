import{PowerUps} from './PowerUps.js'
export class Nuke extends PowerUps{
    
    SendEffect(){
        super.SendEffect();
    }
    Effect(playerid){
        for(var i = 0; i < gamescene.player1.unidades.length; i++){
            gamescene.player1.unidades[i].Die();
        }
        for(var i = 0; i < gamescene.player2.unidades.length; i++){
            gamescene.player2.unidades[i].Die()
        }
        gamescene.player1.unidades = [];
        gamescene.player2.unidades = [];
    }
}