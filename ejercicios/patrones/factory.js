class Pool {

}

Pool._free = []
Pool._waiting = []
Pool._count = 0
Pool._max = 1

Pool.requestInstance = () => {
  //aqui tu codigo
}

Pool.freeInstance = (instance) => {
  //aqui tu codigo
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


