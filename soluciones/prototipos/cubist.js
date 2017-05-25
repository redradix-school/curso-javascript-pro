// config

const COMP_GRID_SIZE = 100
const VARIATION_ROLLS = 3
const TICK_DELAY = 10

// utils

function getImageElement (url) {
  // loads the image element
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = 'Anonymous'
    img.onload = () => resolve(img)
    img.onerror = err => reject(err)
    img.src = url
  })
}

function loadImage(url) {
  // returns a context with the image in URL drawn on it
  return getImageElement(url).then((img) => {
    // const canvas = document.createElement('canvas')
    const canvas = document.getElementById('reference-canvas')
    const ctx = canvas.getContext('2d')
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
    return { ctx: ctx, width: canvas.width, height: canvas.height, canvas: canvas }
  })
}

// queries

function downscaleCanvas(state, canvas) {
  state.actx.drawImage(canvas, 0, 0, state.w, state.h, 0, 0, COMP_GRID_SIZE, COMP_GRID_SIZE)
  return state.actx.getImageData(0, 0, COMP_GRID_SIZE, COMP_GRID_SIZE).data;
}

// commands

function clear(context, w, h) {
  // clear the canvas
  context.fillStyle = 'rgb(0,0,0)'
  context.fillRect(0, 0, w, h)
}

function drawPolygon(context, polygon) {
  // draw a TRIANGE on the CONTEXT.
  // triangle: { a: {x, y}, b: {x, y}, c: {x, y}, color: { r, g, b, a } }
  if (!polygon) { return; }
  const { r, g, b, a } = polygon.color;
  context.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`
  context.beginPath()
  context.moveTo(polygon[0].x, polygon[0].y)
  for (let i = 0; i < polygon.sides; i++)
    context.lineTo(polygon[i].x, polygon[i].y)
  context.closePath()
  context.fill()
}

function drawAverages(ctx, w, h, averages) {
  ctx.drawImage(averages, 0, 0, COMP_GRID_SIZE, COMP_GRID_SIZE, 0, 0, w, h)
}

// individual commands

function drawDna(ctx, dna) {
  // individual: tree of triangles
  for (let i = 0; i < CHROMOSOMES; i++) {
    drawPolygon(ctx, dna[i])
  }
}

// combination commands


// fitness

function distance3d(x1, y1, z1, x2, y2, z2) {
  // we don't really need to calculate de sqrt
  const xdelta = x2 - x1
  const ydelta = y2 - y1
  const zdelta = z2 - z1
  return xdelta * xdelta + ydelta * ydelta + zdelta * zdelta
}

function fitness(avg, ref) {
  // calculates how similar is CONTEXT to IMAGEDATA
  let distance = 0
  for (let y = 0; y < COMP_GRID_SIZE; y++) {
    const offset = y * COMP_GRID_SIZE * 4
    for (let x = 0; x < COMP_GRID_SIZE; x ++) {
      const i = offset + x * 4
      distance += distance3d(
        ref[i + 0], ref[i + 1], ref[i + 2],
        avg[i + 0], avg[i + 1], avg[i + 2]
      )
    }
  }
  return distance
}

// main loop

function mainLoop(state) {
  if (!window.paused) {
    const child = mutate(state.fittest, state.w, state.h)
    clear(state.monitorCtx, state.w, state.h)
    drawDna(state.monitorCtx, child.dna)
    const averages = downscaleCanvas(state, state.monitorCanvas)
    const childFitness = fitness(averages, state.ref.averages)
    if (childFitness < state.fitness) {
      state.fitness = childFitness
      state.fittest = child
      clear(state.ctx, state.w, state.h)
      drawDna(state.ctx, child.dna)
    }
    state.generationCount++

    if (state.generationCount % 10 == 0) {
      const fp = (1 - (state.fitness / state.maxDistance))
      console.log('fitness:', (pow(fp, 4) * 100).toFixed(2), '%')
      state.generationCounter.innerText = state.generationCount
      clear(state.avgCtx, state.w, state.h)
      downscaleCanvas(state, state.canvas)
      drawAverages(state.avgCtx, state.w, state.h, state.acanv)
    }
  }
  setTimeout(mainLoop.bind(null, state), TICK_DELAY)
}

// setup

const state = {}

function init() {
  // p : sets up and returns the initial
  const imageUrl = getRefImageUrl()
  return loadImage(imageUrl).then((reference) => {
    // context
    const rect = canvas.getBoundingClientRect()
    state.canvas = document.getElementById('canvas')
    state.ctx = state.canvas.getContext('2d')
    state.h = rect.height
    state.w = rect.width
    state.monitorCanvas = document.getElementById('canvas-monitor')
    state.monitorCtx = state.monitorCanvas.getContext('2d')
    // --
    state.acanv = document.createElement('canvas')
    state.acanv.width = COMP_GRID_SIZE
    state.acanv.height = COMP_GRID_SIZE
    state.actx = state.acanv.getContext('2d')
    // reference
    const ref = {
      canvas: reference.canvas,
      ctx: reference.ctx,
      w: reference.width,
      h: reference.height
    }
    state.ctx.drawImage(ref.canvas, 0, 0)
    ref.averages = downscaleCanvas(state, state.canvas)
    state.ref = ref
    state.maxDistance = COMP_GRID_SIZE * COMP_GRID_SIZE * 255 * 255 * 3
    // reference avg
    const refAveragesCtx = document.getElementById('reference-vector').getContext('2d')
    refAveragesCtx.imageSmoothingEnabled = false
    drawAverages(refAveragesCtx, ref.w, ref.h, state.acanv)
    // population
    state.fittest = generateRandomIndividual(state.w, state.h)
    clear(state.monitorCtx, state.w, state.h)
    drawDna(state.monitorCtx, state.fittest.dna)
    const averages = downscaleCanvas(state, state.monitorCanvas)
    state.fitness = fitness(averages, state.ref.averages)
    state.generationCount = 0
    state.generationCounter = document.getElementById('generation-counter')
    // --
    state.avgCtx = document.getElementById('canvas-vector').getContext('2d')
    state.avgCtx.imageSmoothingEnabled = false
    // main loop
    mainLoop(state)
  })
}

// initialization

window.onload = function () {
  init()
}
