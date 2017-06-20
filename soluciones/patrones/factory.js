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

/* Decorador */
function pool(instances) {
  return (Constructor) => {
    Constructor._free = []
    Constructor._waiting = []
    Constructor._count = 0
    Constructor._max = 1

    Constructor.requestInstance = () => {
      return new Promise((resolve, reject) => {
        if (Constructor._count < Constructor._max) {
          Constructor._count++
          return resolve(new Constructor())
        } else if (Constructor._free.length > 0) {
          return resolve(Constructor._free.pop())
        }
        Constructor._waiting.push(resolve)
      })
    }

    Constructor.freeInstance = (instance) => {
      if (Constructor._waiting.length > 0) {
        Constructor._waiting.pop()(instance)
      } else {
        Particle._free.push(instance)
      }
    }
  }
}

// ejemplo de uso

@pool(1)
class Tickets {
  
}

Tickets.requestInstance().then((p) => {
  console.log('> got p!')
  setTimeout(() => Tickets.freeInstance(p), 1500)
  console.log('> requesting q...')
  Tickets.requestInstance().then((q) => {
    console.log('> got q!')
  })
})




