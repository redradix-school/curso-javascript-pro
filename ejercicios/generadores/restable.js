var g = resetableGenerator(3)
g.next()         // {value: 0, done: false}
g.next()         // {value: 1, done: false}
g.next(true)     // {value: 0, done: false}
g.next()         // {value: 1, done: false}
g.next() .       // {value: 2, done: false}
g.next()         // {value: 3, done: true}
g.next()         // {value: undefined, done: true}
