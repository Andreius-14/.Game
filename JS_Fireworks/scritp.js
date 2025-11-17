/* eslint indent: "off" */
/* eslint-disable space-before-function-paren */

// ______________________________________________________
//
//                      CONST
// ______________________________________________________
//

// const cellSize = 40

const _width = innerWidth
const _height = innerHeight
// document.body.appendChild(canvas)
const mouse = {
    x: _width / 2,
    y: _height / 2
}

const color = ['#2185C5', '#3ECEFD', '#FFF6E5', '#FF7F66']

// ______________________________________________________
//
//                      Base
// ______________________________________________________
//

const canvas = document.getElementById('canvas')
canvas.width = _width
canvas.height = _height

const c = canvas.getContext('2d')

// ______________________________________________________
//
//                      CLASS
// ______________________________________________________
//
class Particle {
    constructor(x, y, radius, color, velocity) {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
        this.velocity = velocity
    }

    draw() {
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        c.fillStyle = this.color
        c.fill()
        c.closePath()
    }

    update() {
        this.draw()
        this.x += this.velocity.x
        this.y += this.velocity.y
    }
}



// ______________________________________________________
//
//                      FUNCTION
// ______________________________________________________
//

const particles = []
function init() {

}
function animate() {
    requestAnimationFrame(animate)
    c.fillStyle = 'rgba(0,0,0,0.05)'
    c.fillRect(0, 0, canvas.width, canvas.height)

    particles.forEach((particle) => {
        particle.update()
    })
    // c.fillText('HTML CANVAS BOILEPLATE', mouse.x, mouse.y)
}

init()
animate()
// ______________________________________________________
//
//                      EVENT
// ______________________________________________________
//

addEventListener('resize', () => {
    canvas.width = _width
    canvas.height = _height

    init()
}
)

addEventListener('click', (event) => {
    mouse.x = event.clientX
    mouse.y = event.clientY

    const particleCount = 400
    const angleIncrement = (Math.PI * 2) / particleCount
    for (let i = 0; i < 400; i++) {
        // const element = array[i];
        particles.push(new Particle(mouse.x, mouse.y, 5, 'blue',
            {
                x: Math.cos(angleIncrement * i) * Math.random(),
                y: Math.sin(angleIncrement * i) * Math.random()
            }))


    }

    console.log(particles)
    // console.log(mouse)
})
