var fs = require('fs')

function nodefcall(fn) {
  var args = [].slice.call(arguments, 1)
  return new Promise((res, rej) => {
    fn.apply({}, args.concat(function(err) {
      var resultArgs = [].slice.call(arguments, 1)
      if (err) reject(err)
      resolve(...resultArgs)
    }))
  })
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
