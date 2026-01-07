/* eslint indent: "off" */
/* eslint-disable space-before-function-paren */

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const wave = {
    y: canvas.height / 2,
    length: 0.01,
    amplitude: 100,
    frecuency: 0.01
}

let increment = wave.frecuency
function animate() {
    requestAnimationFrame(animate)
    c.fillStyle = 'rgba(0,0,0,0.01)'
    c.fillRect(0, 0, canvas.width, canvas.height)

    // c.clearRect(0,0,canvas.width,canvas.height)
    c.beginPath()

    c.moveTo(0, canvas.height / 2)

    // For - Pixel - Ancho
    for (let i = 0; i < canvas.width; i++) {
        c.lineTo(
            i,
            wave.y +
            Math.sin(i * wave.length + increment) *
            wave.amplitude * Math.sin(increment)
        )
    }

    c.strokeStyle = 'hsl(200,50%,50%)'
    c.stroke()

    increment += wave.frecuency
}

animate()

//https://www.youtube.com/watch?v=VNmTubIDZOY&list=PLpPnRKq7eNW3We9VdCfx9fprhqXHwTPXL&index=11 
