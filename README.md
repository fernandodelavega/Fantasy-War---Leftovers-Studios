# Fantasy War
![full intro g](https://user-images.githubusercontent.com/115580903/196520801-17ccc620-c32b-4528-9b38-94fa0f335696.gif)

## Game in development for Juegos en Red
 - Name: *Fantasy War*
 - Description: Fantasy RTS 1 VS 1 
## Developers: 
| Name | Official email | GitHub |
| :---        |    :----:   |          ---: |
| Fernando de la Vega Valle | *f.delavegav@alumnos.urjc.es* | @fernimc96 |
| Alexander Tercero Moreno | *a.tercero.2020@alumnos.urjc.es* | @alexandeiro |
| Pacual Gázquez Compán | *p.gazquez.2018@alumnos.urjc.es* | @pascualgazquez |
| Diego Nicolás Barreales| *d.nicolás.2019@alumnos.urjc.es* | @dieguoin |

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

Juego multijugador local de 2 personas, las partidas son cortas de 5 minutos como máximo, en las que los jugadores intentan destruir la base enemiga mientras defienden la suya, enviando tropas por los caminos. Las tropas cuestan oro, del cual se genera uno cada 3 segundos.
El ganador se decide cuando una base es destruida o cuando se acaba el tiempo. El jugador que más vida tenga será el ganador. Es posible que haya un empate.

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
Atacante básico con daño a melée.
Precio:1

Mago:
Atacante básico de rango.
Precio:1

Paladín:
Tanque básico.
Precio:1

Caballero:
Atacante fuerte de melée.
Precio:3

Dragon:
Atacante fuerte de rango.
Precio:3

Golem:
Tanque fuerte.
Precio: 3


### Movimiento y físicas:
Las bases de los jugadores tienen posiciones fijas en los 2 extremos de la pantalla.
Los personajes que invoca cada jugador se mueven desde una torre hasta la otra por los caminos. Al encontrarse con un enemigo se detienen y combaten. En caso de llegar a la base, la golpea hasta que le quite toda la vida.




### Diagrama de flujo:


Comienza la partida, se comprueba que se hayan cumplido las condiciones de derrota de cada jugador. Si es así, se acaba la partida.
En caso de que no haya acabado la partida si atacan al jugador mira si tiene oro para defenderse. En caso afirmativo, invoca una tropa y vuelve al principio. En caso negativo, vuelve al principio.
Si no están atacando al jugador, comprueba si tiene oro suficiente. En caso afirmativo, invoca una tropa para atacar y vuelve al inicio. En caso negativo, vuelve al inicio.


## Arte:
El juego está inspirado en los múltiples relatos de fantasía de la cultura popular.
(Aquí se irán añadiendo todos los diseños que se lleven a cabo).





## Sonido y música:
Efectos de sonido hechos por los desarrolladores y mezclados con sintetizador.
## Marketing:
Redes sociales: Instagram ()

