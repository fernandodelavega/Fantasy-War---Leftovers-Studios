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
            
            this.camino = (this.camino - 1) % 3;
        }
    }
}