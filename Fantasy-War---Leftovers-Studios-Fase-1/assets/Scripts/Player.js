export class Player
{
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
        console.log(this.unidades);
    }
    RemoveUnidad(unidad){
        this.unidades.remove(unidad);
    }
}