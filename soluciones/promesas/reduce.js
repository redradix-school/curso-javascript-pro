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
  var args = [].slice.call(arguments, 2),
    fn = obj[method];
  return nodefcall(fn.bind.apply(fn, [obj].concat(args)));
  //return nodefcall(fn.bind(obj), ...args);
}

var readFsPromise = (file) => nodeinvoke(fs, 'readFile', file)

function reduce(col, iteratee, initialValue) {
  return col.reduce(
    (acc, v) => acc.then(val => return iteratee(val, v)),
    Promise.resolve(initialValue)
  )
}

var files = ['./files/uno.txt', './files/dos.txt', './files/tres.txt', './files/cuatro.txt']
var contents = reduce(files,
  (total, v) => readFsPromise(v).then(function(v) {
    console.log('total', total)
    return total + v.toString()
  }),
  'empezamos: ')
  .then(function(content) {
    console.log('contents')
    console.log(content)
  })
