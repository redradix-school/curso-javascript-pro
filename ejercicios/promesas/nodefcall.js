var fs = require('fs')

function nodefcall(fn) {
  // Tu código aquí
}

nodefcall(fs.readFile, './files/uno.txt')
.then((data) => {
  console.log(data.toString())
})

nodefcall(fs.stat, './files/uno.txt')
.then((data) => {
  console.log(data.toString())
})
