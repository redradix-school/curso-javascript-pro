function* migenerador(param) {
  let nuevoValor = yield param
  return nuevoValor
}

var g = migenerador(2)
g.next()
