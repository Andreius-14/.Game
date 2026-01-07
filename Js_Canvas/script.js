const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const wave = {
  y: canvas.height/2,
  length: 0.01,
  amplitude: 100,
  frecuency: 0.01
}

let increment = wave.frecuency
function animate () {
  requestAnimationFrame(animate)

  c.beginPath()

  c.moveTo(0, canvas.height / 2)

  // For - Pixel - Ancho
  for (let i = 0; i < canvas.width; i++) {
    c.lineTo(i, wave.y + Math.sin(i * wave.length + increment) * wave.amplitude)
  }

  c.stroke()

  increment += wave.frecuency
}

animate()
