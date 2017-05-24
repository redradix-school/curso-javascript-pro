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


function mutate(individual, w, h) {
  // esta es la funcion principal
}
