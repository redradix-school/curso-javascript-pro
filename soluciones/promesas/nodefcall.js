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

nodefcall(fs.readFile, './files/uno.txt')
.then((data) => {
  console.log(data.toString())
})
