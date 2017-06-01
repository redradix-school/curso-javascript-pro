function singleton(Constructor) {
  let instance = null;
  Constructor.getInstance = (...args) => {
    if (instance === null) {
      instance = new Constructor(...args);
    }
    return instance;
  }
  return Constructor;
}
