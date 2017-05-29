var fs = require('fs')

function nodefcall(fn) {
  // aquí tu código
}

nodefcall(fs.readFile, './files/uno.txt')
.then((data) => {
  console.log(data.toString())
})

nodefcall(fs.stat, './files/uno.txt')
.then((data) => {
  console.log(data.toString())
})
