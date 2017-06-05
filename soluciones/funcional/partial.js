function partialKey(obj, method, ...args) {
  var fn = obj[method]
  return function() {
    return fn.apply(obj, [...args].concat(Array.from(arguments)))
  }
}

const object = {
  'user': 'fred',
  'greet': function(greeting, punctuation) {
    return greeting + ' ' + this.user + punctuation
  }
}

const bound = partialKey(object, 'greet', 'hi')
console.log(bound('!'))


