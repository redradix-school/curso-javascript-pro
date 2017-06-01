import Store from './store'

window.onload = () => {

  // this is just business logic

  const store = new Store((action, state = { counter: 0 }) => {
    switch (action.type) {
      case 'INC': return { counter: state.counter + 1 }
      case 'DEC': return { counter: state.counter - 1 }
    }
  })


  const display = document.getElementById('counter')
  store.on('change', () => {
    const { counter } = store.getState()
    console.log(counter)
    display.innerText = counter
  })


  const incButton = document.getElementById('inc-button')
  incButton.addEventListener('click', () => store.dispatch({ type: 'INC' }))
  const decButton = document.getElementById('dec-button')
  decButton.addEventListener('click', () => store.dispatch({ type: 'DEC' }))
}
