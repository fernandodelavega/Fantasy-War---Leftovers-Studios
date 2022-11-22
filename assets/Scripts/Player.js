class Player
{
    constructor(oro, base, caminoSeleccionado)
    {
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