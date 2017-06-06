function get(object, path, defaultValue) {
  let index = 0
  const length = path.length

  while (object != null && index < length) {
    object = object[path[index++]]
  }
  return (index && index == length) ? object : defaultValue
}











const item1 = {
  fees: {
    itemizeFees: [
      {otraPropiedad: 'holi'}
    ]
  }
}

const item2 = {
  fees: {
    itemizeFees: [
      {otraPropiedad: 'holi'}
    ]
  }
}

console.log('get1', get(item1, ['fees', 'itemizeFees', 0, 'otraPropiedad'], 'sup?'))
console.log('get2', get(item2, ['fees', 'noexiste', 0, 'otraPropiedad'], 'sup?'))
