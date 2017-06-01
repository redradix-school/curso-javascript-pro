class Pool {

}

Pool._free = []
Pool._waiting = []
Pool._count = 0
Pool._max = 1

Pool.requestInstance = () => {
  return new Promise((resolve, reject) => {
    if (Pool._count < Pool._max) {
      Pool._count++
      return resolve(new Pool())
    } else if (Pool._free.length > 0) {
      return resolve(Pool._free.pop())
    }
    Pool._waiting.push(resolve)
  })
}

Pool.freeInstance = (instance) => {
  if (Pool._waiting.length > 0) {
    Pool._waiting.pop()(instance)
  } else {
    Particle._free.push(instance)
  }
}

// ejemplo de uso

Pool.requestInstance().then((p) => {
  console.log('> got p!')
  setTimeout(() => Pool.freeInstance(p), 1500)
  console.log('> requesting q...')
  Pool.requestInstance().then((q) => {
    console.log('> got q!')
  })
})


