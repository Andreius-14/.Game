const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})

readline.question('Introduzca la URL de la página: ', (url) => {
  readline.question('Introduzca el className: ', (className) => {
    // Aquí puedes utilizar la URL y el className para rellenar los campos
    console.log(`URL: ${url}`)
    console.log(`ClassName: ${className}`)

    readline.close()
  })
})
