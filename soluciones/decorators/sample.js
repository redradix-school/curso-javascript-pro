function educated(target, key, descriptor) {
  descriptor.value = function() {
    console.log(`* ${this.name} controls itself.`);
  }
  return descriptor;
}

class Dog {
  constructor(name) {
    this.name = name;
  }

  @educated
  bark () {
    console.log('Wof, wof!');
  }
}

var toby = new Dog('toby')
toby.bark()
