class Dispatcher {

  // aquí tu codigo

}

Dispatcher.getInstance = (() => {
  let instance = null;
  return (...args) => {
      if (instance === null) {
            instance = new Dispatcher(...args);
    }
    return instance;
  }
})();

const dispatcher = Dispatcher.getInstance()

dispatcher.register((action) => {
  switch (action.type) {
      case 'SAVE_USER_DATA':
        return console.log('Saving user data', action.payload, '...')
  }
})

// in another module...
dispatcher.register((action) => {
  switch (action.type) {
      case 'LOGOUT':
        return console.log('Good bye.')
  }
})

dispatcher.dispatch({
  type: 'SAVE_USER_DATA',
  payload: { name: 'John' }
})

dispatcher.dispatch({
  type: 'LOGOUT'
})
