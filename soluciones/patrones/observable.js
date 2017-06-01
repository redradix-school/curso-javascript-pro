class Observable {

  constructor() {
    this.listeners = new Map()
  }

  on(event, listener) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set())
    }
    this.listeners.get(event).add(listener)
  }

  off(event, listener) {
    if (this.listeners.has(event)) {
      this.listeners.get(event).delete(listener)
    }
  }

  emit(event, ...args) {
    if (this.listeners.has(event)) for (let fn of this.listeners.get(event)) fn(...args)
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
