function withCounter(Constructor) {
  const Counted = class extends Constructor {
    constructor(...arg) {
      Counted.instances++;
      super(arg)
    }
  }
  Counted.instances = 0
  Counted.getInstanceCount = function() {
    return Counted.instances
  }
  return Counted
}

class Dog {
  constructor(name) {
    this.name = name;
  }

  bark() {
    console.log(`Come on, ${this.name}, let's go outside!`);
  }
}

const CountedDog = withCounter(Dog);

const pipa = new CountedDog();
console.log(CountedDog.getInstanceCount())

const spot = new CountedDog();
const toby = new CountedDog();
console.log(CountedDog.getInstanceCount())
