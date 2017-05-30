async function sumaAsincrona() {
  var a = await Promise.resolve(1)
  var b = await Promise.resolve(2)
  return a + b
}

sumaAsincrona().then(console.log)
