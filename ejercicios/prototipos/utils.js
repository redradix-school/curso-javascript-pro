// utilities

const PI = Math.PI
const PI2 = PI * 2
const random = Math.random
const max = Math.max
const min = Math.min
const floor = Math.floor
const sin = Math.sin
const cos = Math.cos
const pow = Math.pow

function maybelog() {
  if (random() < 0.01) console.log.apply(console, arguments)
}

function rnd(n) {
  return floor(Math.random() * n)
}

function rndVariation(n, v) {
  // biased to lower values
  const rolls = []
  for (let i = VARIATION_ROLLS; i--;) rolls.push(rnd(v))
  const r = min.apply(Math, rolls)
  if (random() < 0.5) {
    return n + r
  }
  return n - r
}

function sample(arr) {
  return arr[rnd(arr.length)]
}
