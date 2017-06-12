global.debug = true

function _catch(target, key, descriptor) {
  const old = descriptor.value
  descriptor.value = function() {
    try {
      return old.apply(this, arguments)
    } catch(e) {
      console.log(e)
      if (global.debug) throw e
    }
  }
}

class Dog {
  constructor(name) {
    this.name = name;
  }
  @_catch
  bark (text) {
    if (Math.random() < 0.5) throw new Error('How barking worked?')
    console.log('Wof, wof!', text);
  }
}

setTimeout(function() {
  var toby = new Dog('toby')
  toby.bark('grrrr')
}, 1000)
