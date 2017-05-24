// config

const POLY_SIDES = 3
const CHROMOSOMES = 200
const CHROMOSOME_MUTATION_DELTA = 100
const CHROMOSOME_COLOR_DELTA = 100
const MUTATION_PROBABILITY = 3

/* devuelve la URL de la imagen a copiar */

function getRefImageUrl() {
  return 'http://dantri4.vcmedia.vn/a3HWDOlTcvMNT73KRccc/Image/2013/11/42a-83e38.jpg';
}

/* genera un individuo aleatorio */

function generateRandomPoint(w, h) {
  return {
    x: max(0, min(w, rnd(w))),
    y: max(0, min(w, rnd(h))),
  }
}

function generateRandomPolygon(w, h) {
  const poly = {
    sides: POLY_SIDES,
    color: { r: 0, g: 0, b: 0, a: 0.3 }
  }
  for (let i = 0; i < poly.sides; i++) {
    poly[i] = generateRandomPoint(w, h)
  }
  return poly
}

function generateRandomIndividual(w, h) {
  // esta es la funcion principal
  const dna = {}
  for (let i=0; i<CHROMOSOMES; i++) {
    dna[i] = generateRandomPolygon(w, h)
  }
  return { dna: dna }
}


function mutatePoly(poly, w, h) {
  const mutated =poly
  for (let i = 0; i < mutated.sides; i++) if (rnd(100) < MUTATION_PROBABILITY) {
    if (random() < 0.5) {
      mutated[i] =  {
        x: max(0, min(w, rndVariation(mutated[i].x, CHROMOSOME_MUTATION_DELTA))),
        y: mutated[i].y
      }
    } else {
      mutated[i] =  {
        x: mutated[i].x,
        y: max(0, min(h, rndVariation(mutated[i].y, CHROMOSOME_MUTATION_DELTA)))
      }
    }
  }
  return mutated
}

function mutateChromosome(chromosome, w, h) {
  const mutated = mutatePoly(chromosome, w, h)
  if (rnd(100) < MUTATION_PROBABILITY) {
    mutated.color = chromosome.color
    const comp = sample(['r', 'g', 'b'])
    mutated.color[comp] = max(0, min(255, rndVariation(chromosome.color[comp],
                                                       CHROMOSOME_COLOR_DELTA)))
  }
  return mutated
}







function mutate(individual, w, h) {
  // esta es la funcion principal
  const child = Object.create(individual)
  for (let i = 0; i < CHROMOSOMES; i++) {
      child.dna[i] = mutateChromosome(individual.dna[i], w, h)
  }
  console.log(child)
  return  child
}






