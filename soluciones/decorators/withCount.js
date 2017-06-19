function withCount(Constructor) {
  let count = 0
  function Construct() {
    count++
    return new Constructor(...arguments)
  }
  Construct.getInstanceCount = function() {
    return count
  }
  return Construct

}

@withCount
class Dog {
  constructor(name) {
    this.name = name;
  }

  bark() {
    console.log('Wof, wof!');
  }
}

const toby = new Dog('toby')
const toby2 = new Dog('toby2')
console.log('count', Dog.getInstanceCount())