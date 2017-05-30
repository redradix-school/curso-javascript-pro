var fs = require('fs')

function nodefcall(fn) {
  return new Promise((resolve, reject) => {
    var args = [].slice.call(arguments, 1)

    fn.apply({}, args.concat(function(err) {
      var resultArgs = [].slice.call(arguments, 1);
      if (err) {
        reject(err);
      } else {
        resolve(...resultArgs)
      }
    }));
  })
}

var readFsPromise = (file) => //llama a nodefcall con el parámetro file

function reduce(col, iteratee, initialValue) {
  //aquí tu código
}

var files = ['./files/uno.txt', './files/dos.txt', './files/tres.txt', './files/cuatro.txt']
var contents = reduce(files, (total, v) => readFsPromise(v).then(function(v) {
    return total + v.toString()
  }), 'empezamos: ')
  .then(function(content) {
    console.log('content', content)
  })
