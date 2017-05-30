var fs = require('fs')

function leerFichero(path, cb) {
  fs.readFile(path, function(err, data) {
    if (err) throw err
    return cb(data.toString())
  })
}

leerFichero('./files/ouno.txt', console.log)
