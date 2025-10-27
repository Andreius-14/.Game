const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

// Array
const preguntas = [
  'Cual es tu primer nombre? ',
  'Cual es tu primer apellido? ',
  'Cual es tu edad? '
]
// Funcion - Promesa
const hacerPregunta = (pregunta) => {
  return new Promise((resolve, reject) => {
    rl.question(pregunta, (respuesta) => {
      resolve(respuesta)
    })
  })
}

const preguntar = async (preguntas) => {
  const respuestas = []
  for (const pregunta of preguntas) {
    const respuesta = await hacerPregunta(pregunta)
    respuestas.push(respuesta)
  }
  rl.close()
  return respuestas
}

preguntar(preguntas)
  .then((respuestas) => {
    console.log(
      `Hola ${respuestas[0]} ${respuestas[1]}, tu edad es la siguiente: ${respuestas[2]
      }`
    )
  })
  .catch((error) => {
    console.error('Error:', error)
  })
