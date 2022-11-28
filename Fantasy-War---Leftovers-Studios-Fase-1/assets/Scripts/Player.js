export class Player
{
    base;
    unidades;
    constructor(vida, oro, base, caminoSeleccionado)
    {
        this.vida = vida;
        this.oro = oro;
        this.base = base;
        this.camino = caminoSeleccionado;
        this.unidad = 1;
        this.unidades = new Array();
    }
    AddUnidad(nuevaUnidad){
        this.unidades.push(nuevaUnidad);
    }
    RemoveUnidad(unidad){
        this.unidades.remove(unidad);
    }
    
    siguienteCamino(isUp){
        if(isUp){

            this.camino = (this.camino + 1) % 3;
        }
        else if(!isUp){
            
            this.camino = (this.camino - 1 < 0)? 3 - this.camino - 1 : (this.camino - 1) % 3;
        }
    }
    siguienteUnidad(isRight){
        if(isRight){

            this.unidad = (this.unidad + 1) % 3;
        }
        else if(!isRight){
            
            this.unidad = (this.unidad - 1 < 0)? 3 - this.unidad - 1 : (this.unidad - 1) % 3;
        }
    }
}