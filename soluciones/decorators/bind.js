function bind(...methods) {
  return (Constructor) => class extends Constructor {
    constructor(...args) {
      super(...args)
      methods.forEach(m => this[m] = this[m].bind(this))
    }
  }
}

@bind('bark')
class Dog {
  constructor(name) {
    this.name = name;
  }

  bark() {
    console.log(this.name, 'says: wof, wof!');
  }
}

const spot = new Dog('Spot');
const toi = new Dog('Toi');
toi.bark.call(spot)
