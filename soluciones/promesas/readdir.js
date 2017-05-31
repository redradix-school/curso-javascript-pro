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

nodefcall(fs.readdir, './files')
.then(data => {
  console.log(data)
  return Promise.all(data.map(f => nodefcall(fs.readFile, './files/' + f)))
})
.then(content => {
  console.log('OK', content.map(c => c.toString()))
})

