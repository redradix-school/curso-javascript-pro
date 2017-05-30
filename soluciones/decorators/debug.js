var window = {debug: false}

function debug(target, key, descriptor) {
  const method = descriptor.value
  descriptor.value = function() {
    return window.debug? method.apply(this, arguments) : null
  };
  return descriptor
}

class Dog {
  constructor(name) {
    this.name = name;
  }

  @debug
  bark () {
    console.log('Wof, wof!');
  }
}


var toby = new Dog('toby')
toby.bark()
toby.bark()
toby.bark()
toby.bark()
