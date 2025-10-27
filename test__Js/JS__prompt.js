const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})

readline.question('Introduzca su nombre: ', (nombre) => {
  readline.question('Introduzca su apellido: ', (apellido) => {
    console.log(`¡Hola ${nombre} ${apellido}!`)
    readline.close()
  })
})
