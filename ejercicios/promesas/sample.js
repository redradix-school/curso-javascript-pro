var fs = require('fs')

fs.readFile('./files/uno.txt', function(err, data) {
  if (err) {
    console.log(err)
  } else {
    console.log(data.toString())
  }
})
