import Observable from './observable'

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
}

export default Store
