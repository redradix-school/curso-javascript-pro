# Cubista Automatico

Vamos a sondear el campo del aprendizaje automatico haciendo un ejercico de
programacion genetica. Vamos a escribir un programa que genera copias cubistas
de cuadros componiendo triangulos semi transparentes.

--

mona-80k.png

chrome-42k.png

darwin-25k.png

--

Para implementar a nuestro cubista, necesitamos establecer primero un
diccionario de conceptos:

- *Individuo*: un conjunto de N triangulos que, al pintarlos, generan una
  "version" del cuadro.
- *ADN*: la estructura de datos con la que representamos los N triangulos de un
  individuo
- *Cromosoma*: cada uno de los triangulos que componen el _ADN_
- *Fitness*: el parecido de un individuo al cuadro original

--

El funcionamiento general del cubista es muy sencillo:

1. Guardamos el individuo que mejor _fitness_ haya tenido hasta ahora
2. Introducimos alguna mutacion aleatoria en su _ADN_
3. Comparamos el _fitness_ del hijo con el del padre
4. Volvemos a (1)

--

Vuestro trabajo consiste en implementar los metodos:

- *getRefImageUrl()*: devuelve la url del cuadro a copiar
- *generateRandomIndividual(w, h)*: genera el primer individuo inicial, con ADN
  aleatorio pero todos los triangulos empiezan en NEGRO y ALPHA: 0.3
- *mutate(individual, w, h)*: que se encarga de generar la desdendencia de
  _individual_ a base de introducir alguna mutacion en su _ADN_
  
--

- Esos metodos seran invocados dedse el codigo que nosotros os proporcionamos.
- Ejecutar el navegador con soporte para ES6 (en Chrome funciona seguro)

--

Detalles de la implementacion:

--

Un *INDIVIDUO* tiene esta pinta:

```
{
  dna: {
    1: {
      color: { r: 23, g: 48, b: 100, a: 0.3 },
      sides: 3,
      1: { x: 10, y: 19 },
      2: { x: 23, y: 89 },
      3: { x: 87, y: 45 }
    },
    
    2: {
    /* ... */
    },
    
    /* ... */
    
    50: {
      /* ... */
    }
  }
}
```

--

Cada mutacion deberia:
- seleccionar algunos cromosomas aleatoriamente
- tal vez modificar la posicion de uno o mas de sus vertices
- tal vez modificar algun componente de su color
- tal vez modificar su transparencia
- devolver un nuevo individuo completo

--

Parametros de configuracion, definidos como constantes en el fichero:

- *POLY_SIDES*: Cuantos vertices tiene cada cromosoma (para generar poligonos
  mas complejos)
- *CHROMOSOMES*: Cuantos cromosomas (poligonos) por cada individuo
- *CHROMOSOME_MUTATION_DELTA*: Regula la magnitud de la mutacion de posicion
- *CHROMOSOME_COLOR_DELTA*: Regula la magnitud de la mutacion de color
- *MUTATION_PROBABILITY*: Probabilidad de mutacion de cada cromosoma

--

Teneis unas cuantas utilidades a vuestra disposicion en utils.js:

- *rnd(n)*: Numero entero aleatorio entre 0 y N (N no incluido)
- *rndVariation(n, delta)*: Devuelve n + [rnd(-delta), rnd(delta)]. Sesgado
  hacia modificaciones peque~as.
- *sample(array)*: devuelve un elemento aleatorio de array
- *maybelog(...)*: console.log con muy baja probabilidad de ejecutarse

--

Notas generales:

- Deberiais ver cierto parecido alrededor de la iteracion 1k o 2k
- Si haceis mutaciones demasiado bruscas no va a funcionar
- Si haceis mutaciones demasiado sutiles va a tardar muchisimo (y no va a
  funcionar)
- Lo ideal es hacer mutaciones que la mayor parte de las veces sean sutiles,
  pero de vez en cuando sean mas bruscas
- Si la probabilidad de mutacion es demasiado alta, se perdera demasiada
  informacion genetica en cada generacion y los genes "buenos" no llegaran a la
  descendencia
- Si la probabilidad de mutacion es demasiado baja tardaremos mucho en ver
  resultados (pero funcionara eventualmente)
- Si va demasiado lento en vuestro ordenador, cambiad la constante
  *COMP_GRID_SIZE* en cubist.js a un numero mas bajo (no menos de 35)
