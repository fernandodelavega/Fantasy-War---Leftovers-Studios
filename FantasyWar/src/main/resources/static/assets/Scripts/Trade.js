import{PowerUps} from './PowerUps.js'
export class Trade extends PowerUps{
    SendEffect(){
        super.SendEffect();
    }
    Effect(playerId){

        this.aux = gamescene.player1.oro;
        gamescene.player1.oro = gamescene.player2.oro;
        gamescene.player2.oro = this.aux;
    }
}