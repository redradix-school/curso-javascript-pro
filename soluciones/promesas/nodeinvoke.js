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
  //return nodefcall(fn.bind.apply(fn, [obj].concat(args)));
  return nodefcall(fn.bind(obj), ...args);
}

nodeinvoke(fs, 'readFile', './files/uno.txt')
.then((data) => {
  console.log(data.toString())
})

