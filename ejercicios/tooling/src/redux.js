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

class Store extends Observable {

  constructor(reducer, initialState) {
    super()
    this.reducer = reducer
    this.state = initialState
  }

  dispatch(action) {
    this.state = this.reducer(action, this.state)
    this.emit('change', this.state)
  }

  getState() {
    return this.state
  }
}                               // 

// ---

window.onload = () => {

  // this is just business logic

  const store = new Store((action, state = { counter: 0 }) => {
    switch (action.type) {
      case 'INC': return { counter: state.counter + 1 };
      case 'DEC': return { counter: state.counter - 1 };
    }
  })

  // this is just display logic

  const display = document.getElementById('counter');
  store.on('change', () => {
    const { counter } = store.getState()
    display.innerText = counter
  })

  // this is just interaction logic

  const incButton = document.getElementById('inc-button');
  incButton.addEventListener('click', () => store.dispatch({ type: 'INC' }))
  const decButton = document.getElementById('dec-button');
  decButton.addEventListener('click', () => store.dispatch({ type: 'DEC' }))
}
