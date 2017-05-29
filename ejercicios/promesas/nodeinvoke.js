var fs = require('fs')

function nodeinvoke(obj, method) {
  // aquí tu código
}

nodeinvoke(fs, 'readFile', './files/uno.txt')
.then((data) => {
  console.log(data.toString())
})

