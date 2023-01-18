# Fantasy War
![full intro g](https://user-images.githubusercontent.com/115580903/196520801-17ccc620-c32b-4528-9b38-94fa0f335696.gif)

## Game in development for Juegos en Red
 - Name: *Fantasy War*
 - Description: Fantasy RTS 1 VS 1 
## Developers: 
| Name                      | Official email                   | GitHub             |
| :---                      |    :----:                        |          ---:      |
| Fernando de la Vega Valle | *f.delavegav@alumnos.urjc.es*    | @fernandodelavega  |
| Alexander Tercero Moreno  | *a.tercero.2020@alumnos.urjc.es* | @alexandeiro       |
| Pascual Gázquez Compán    | *p.gazquez.2018@alumnos.urjc.es* | @pascualgazquez    |
| Diego Nicolás Barreales   | *d.nicolas.2019@alumnos.urjc.es* | @dieguoin          |


# GDD
## Introducción
### Concepto del juego:
Se tratará de un juego en el que 2 jugadores se enfrentarán uno contra otro para intentar destruir la base del contrario. El campo de batalla consta de tres carriles, en los cuales, los jugadores tendrán que colocar tropas para intentar llegar a la base del enemigo a la vez que defienden las suya propia.


### Características principales:
Género: 
Estrategia en tiempo real(Real Time Strategy o RTS)
Propósito y público objetivo: 
El público objetivo son estudiantes chicos de 16 a 20 años con poco tiempo para jugar por culpa de los estudios
Estilo visual:
El apartado visual va a ser una estética de fantasía medieval plasmada en pixel art.

Alcance:
Una sola entrega.

## Mecánicas de juego:

### Jugabilidad:

Juego multijugador online de 2 personas, con partidas en las que los jugadores intentan destruir la base enemiga mientras defienden la suya, enviando tropas por los distintos caminos. Las tropas cuestan oro, del cual se genera uno cada 3 segundos.
El ganador se decide cuando una base es destruida. El jugador que más vida tenga será el ganador. Es posible que haya un empate en caso de que los 2 jugadores bajen a 0 de vida a la vez.

### Flujo del juego:
- 1 Inicia partida

- 2 Los jugadores combaten

- 3.1 Una base es destruida → Victoria del jugador que la ha destruido

- 3.2 Se acaba el tiempo → Empate


### Personajes:
Cada personaje tiene unas estadísticas:
- Vida: puntos que salud
- Daño: Cantidad de vida que quita.
- Velocidad: Velocidad a la que se mueve.
- Velocidad de ataque: velocidad a la que hace 2 ataques seguidos.
- Precio: cantidad de oro que cuesta.
	
Goblin: 

Atacante con daño a melée.

Precio:1


Mago:

Atacante de rango.

Precio:1


Golem:

Tanque con daño a melé.
Precio: 1



### Movimiento y físicas:
Las bases de los jugadores tienen posiciones fijas en los 2 extremos de la pantalla.
Los personajes que invoca cada jugador se mueven desde una torre hasta la otra por los caminos. Al encontrarse con un enemigo se detienen y combaten. En caso de llegar a la base, la golpea hasta que le quite toda la vida.


### Pantallas de Juego:

#### Introduccion:

![intro](https://user-images.githubusercontent.com/115580903/204624928-63edd4e2-2766-44b2-8e95-4f854cf2c132.PNG)

Animación del Logo del equipo.

#### Pantalla de Inicio:

![Inicio1](https://user-images.githubusercontent.com/115580903/208793905-07458d3b-ddb5-49c9-b65b-bdeb48bc6279.PNG)

Pantalla principal en la que se puede elegir entre iniciar la partida o pulsar el boton de ayuda que muestra los controles.

#### Pantalla de Ayuda:

![Ayuda1](https://user-images.githubusercontent.com/115580903/208794469-5e888da7-5109-4c26-8ae4-e6ffe0457182.PNG)

Breve descripción e imagen de los distintos controles de ambos jugadores ( Actualmente para modo local)(Pendiente de cambios).

#### Pantalla de Creditos:

![Creditos](https://user-images.githubusercontent.com/115580903/208794479-ffc3431f-b954-458a-8e41-c4b6ecab46bf.PNG)

Pantalla en la cual se muestra a los creadores y desarolladores del juego.

#### Pantalla de Juego:

![Juego1](https://user-images.githubusercontent.com/115580903/208793921-b3a14fd9-7106-4a1a-a32b-7d3558a61e02.PNG)

Pantalla del juego en la que se desarollara la partida. En esta se puede ver el oro de cada jugador, la vida de su base, la unidad seleccionada y el camino por el cual saldra la misma.

#### Pantalla de Fin:

![Fin1](https://user-images.githubusercontent.com/115580903/208794493-44530550-5e5f-4b52-a967-ae8a528c8908.PNG)

Pantalla de final de partida en la cual se muestra el ganador de la misma y un boton que permite volver al menu principal.


### Diagrama de flujo:

![Diagrama de Flujo1](https://user-images.githubusercontent.com/115580903/208795807-fdcd3940-3fe0-4f80-827e-4aa855353c69.png)

## Conexión online

El juego es multijugador online, para lo que se han implementado websockets conectando los clientes con el servidor. Se han utilizado para crear y conectar los usuarios, comunicación con mensajes temporales e instanciar las tropas de cada jugador.

## Arte:
En el juego se han interpretado varios diseños de cultura popular en un pixel art más abstracto. Dentro de las tropas tenemos goblins, golems y magos. 
También se ha hecho un escenario basado en un campo con tres caminos donde se produce la batalla

Mago: 
![mage_r](https://user-images.githubusercontent.com/115580903/204633522-5f1f7b6d-f5a1-4f77-ae17-c04565ac0ff2.png)

Goblin:
![goblin_r](https://user-images.githubusercontent.com/115580903/204633442-96413aaf-e96e-451e-a5ac-5c839c07ac73.png)


Golem:
![golem_r](https://user-images.githubusercontent.com/115580903/204633557-f99ab30d-f51c-4301-8c65-b7d759d3debb.png)

## Sonido y música:
Se ha compuesto una canción para acompañar al juego usando instrumentos de 16 bits y percusión real.
Los efectos de sonido son de 16 bits y se han creado usando el programa "Chiptone". Se han creado efectos de sonido para navegar el menú, para cuando las tropas son colocadas y cuando mueren, y finalmente para cada ataque de cada tipo de tropa.

## Marketing:
Redes sociales: Instagram ()
## Diagrama de Clases:

![Diagrama de clases](https://user-images.githubusercontent.com/115580903/213111010-4d705ce6-cbeb-465a-8624-0e0679f1c049.png)


## Instrucciones de Ejecución:
Requisitos:

Spring Tool Suite de Eclipse

1. Abrir Spring en Eclipse.
2. Seleccionamos File
3. Open Projectyt from Files System>>Directory>>Seleccionamos donde se encuentra.
//Teniendo el archivo/carpeta TankunMayhem[boot] seleccionado
4. Play
5. Run FantasyWar
6. URL: Dependiendo del servidor donde se lanza tiene una dirección IP acompañada de un puerto que es el :8080.

7. A partir de aqui se procede a interactuar directamente con la aplicación. 
