
/* aquí tu código */

class Dog {
  constructor(name) {
      this.name = name;
    }

  bark() {
      console.log(`Come on, ${this.name}, let's go outside!`);
        }
}

const CountedDog = withCountClass(Dog);

const spot = new CountedDog();
const toby = new CountedDog();
console.log(CountedDog._instanceCount)
