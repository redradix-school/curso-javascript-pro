function promesasDeNumeros() {
  let result = []
  for (let i = 5; i > 0; i--)
    result.push(Promise.resolve(i))
  return result
}

Promise.all(promesasDeNumeros())
.then(function(data) {
  console.log(data)
})
