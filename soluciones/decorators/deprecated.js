function deprecated(text) {
  return function(target, key, descriptor) {
    const method = descriptor.value
    descriptor.value = function() {
      console.log(key, text)
      return method.apply(this, arguments)
    };
    return descriptor
  }
}

class Dog {
  constructor(name) {
    this.name = name;
  }

  @deprecated('do not use this')
  bark () {
    console.log('Wof, wof!');
  }
}


var toby = new Dog('toby')
toby.bark()
toby.bark()
toby.bark()
toby.bark()
