class Observable {

  constructor() {
    //inicializacion
  }

  on(event, listener) {
    //aqui tu codigo
  }

  off(event, listener) {
    //aqui tu codigo
  }

  emit(event, ...args) {
    //aqui tu codigo
  }
}

class Dog extends Observable {
  /* ... */
  pet() {
    console.log("I don't know what I'm doing, but feed me")
  }
}

const toi = new Dog()

var sits = function() {
  console.log('Good boy!')
  toi.pet()
}

toi.on('sit', sits)
toi.emit('sit')

toi.off('sit', sits)
toi.emit('sit')
