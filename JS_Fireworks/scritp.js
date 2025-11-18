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

const gravity = 0.005
const friction = 0.99
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
        this.alpha = 1
    }

    draw() {
        c.save()
        c.globalAlpha = this.alpha
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        c.fillStyle = this.color
        c.fill()
        c.closePath()
        c.restore()
    }

    update() {
        this.draw()
        this.velocity.x *= friction
        this.velocity.y *= friction
        this.velocity.y += gravity
        this.x += this.velocity.x
        this.y += this.velocity.y
        this.alpha -= 0.005
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

    particles.forEach((particle, i) => {
        if (particle.alpha > 0) {
            particle.update()
        } else {
            particles.splice(i, 1)
        }
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

    const power = 8
    const particleCount = 400
    const angleIncrement = (Math.PI * 2) / particleCount
    for (let i = 0; i < particleCount; i++) {
        // const element = array[i];
        particles.push(new Particle(mouse.x, mouse.y, 3,
            `hsl(${Math.random() * 360},50%,50%)`,
            {
                x: Math.cos(angleIncrement * i) * Math.random() * power,
                y: Math.sin(angleIncrement * i) * Math.random() * power
            }))


    }

    console.log(particles)
    // console.log(mouse)
})
