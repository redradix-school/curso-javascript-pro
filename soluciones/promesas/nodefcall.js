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

function nodeinvoke(obj, method) {
  var args = [].slice.call(arguments, 2)
  return new Promise((res, rej) => {
    var fn = obj[method]
    if (typeof fn !== 'function') rej('Not a function')
    fn.apply(obj, args.concat(function(err) {
      if (err) rej(err)
      var resultArgs = [].slice.call(arguments, 1)
      res(...resultArgs)
    }))
  })
}

/*nodefcall(fs.readFile, './files/uno.txt')
.then((data) => {
  console.log('fcall readFile: ', data.toString())
})

nodefcall(fs.stat, './files/uno.txt')
.then((data) => {
  console.log('fcall stat ', JSON.stringify(data))
})*/

nodeinvoke(fs, 'readFile', './files/uno.txt')
.then((data) => {
  console.log('finvoke ', data.toString())
})
