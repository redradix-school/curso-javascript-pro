var slice = Array.prototype.slice
function trace(target, key, descriptor) {
  const method = descriptor.value
  descriptor.value = function() {
    console.log(key, slice.call(arguments).join(', '))
    const applied = method.apply(this, arguments)
    console.log(applied)
    return applied
  };
  return descriptor
}


class Dog {
  constructor(name) {
    this.name = name;
  }

  @trace
  bark () {
    console.log('Wof, wof!');
  }
}


var toby = new Dog('toby')
toby.bark()
toby.bark()
toby.bark()
toby.bark()
