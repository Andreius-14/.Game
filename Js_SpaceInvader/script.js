/* eslint indent: "off" */
/* eslint-disable space-before-function-paren */

// ______________________________________________________
//
//                      Base
// ______________________________________________________
//
const _width = innerWidth
const _height = innerHeight

const canvas = document.getElementById('canvas')
canvas.width = _width
canvas.height = _height

const c = canvas.getContext('2d')
//
// const gravity = 0.005
// const friction = 0.99

// ______________________________________________________
//
//                      CONST
// ______________________________________________________
//
const keys = {
    w: {
        pressed: false
    },
    a: {
        pressed: false
    },
    s: {
        pressed: false
    },
    d: {
        pressed: false
    },
    space: {
        pressed: false
    }
}

// ______________________________________________________
//
//                      CLASS
// ______________________________________________________
//
class Player {
    constructor() {
        this.velocity = { x: 0, y: 0 }
        this.rotation = 0
        const url = './Shaders/spaceship.png'
        const image = new Image()
        image.src = url
        image.onload = () => {
            const scale = 0.15
            this.image = image
            this.width = image.width * scale
            this.height = image.height * scale

            this.position = {
                x: canvas.width / 2 - this.width / 2,
                y: canvas.height - this.height - 20
            }
        }
    }

    draw() {
        c.save()

        c.translate(
            player.position.x + player.width / 2,
            player.position.y + player.height / 2
        )
        c.rotate(this.rotation)

        c.translate(
            -player.position.x - player.width / 2,
            -player.position.y - player.height / 2
        )
        c.drawImage(
            this.image,
            this.position.x,
            this.position.y,
            this.width,
            this.height)

        c.restore()
        // c.fillStyle = 'red'
        // c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    update() {
        if (this.image) {
            this.draw()
            this.position.x += this.velocity.x
        }
    }
}

class Projectile {
    constructor({ position, velocity }) {
        this.position = position
        this.velocity = velocity
        this.radius = 3
    }

    draw() {
        c.beginPath()
        c.arc(
            this.position.x,
            this.position.y,
            this.radius,
            0, Math.PI * 2)
        c.fillStyle = 'red'
        c.fill()
        c.closePath()
    }

    update() {
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }
}

//
// ______________________________________________________
//
//                       FUNCTION
// ______________________________________________________
//
// function collitionCanvas(instancia) {
//     return (instancia.position.y <= 0 || instancia.position.x <= 0)
// }
// ______________________________________________________
//
//                    INSTANCIA
// ______________________________________________________
//
const player = new Player()
const projectiles = [

    new Projectile({
        position: {
            x: 300, y: 300
        },
        velocity: {
            x: 5, y: 0
        }
    })
]
//
// ______________________________________________________
//
//                      BUCLE
// ______________________________________________________
//
function animate() {
    //  ┌───────────────────────────────────┐
    //  │              BUCLE                │
    //  └───────────────────────────────────┘
    //
    requestAnimationFrame(animate)

    //  ┌───────────────────────────────────┐
    //  │          Limpiar Canvas           │
    //  └───────────────────────────────────┘

    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)

    //  ┌───────────────────────────────────┐
    //  │             UPDATE                │
    //  └───────────────────────────────────┘
    player.update()
    projectiles.forEach((projectile, index) => {
        if (projectile.position.y + projectile.radius <= 0) {
            setTimeout(() => {
                projectiles.splice(index, 1)
            }, 0)
        } else {
            projectile.update()
        }
    })

    //  ┌───────────────────────────────────┐
    //  │              LOGICA               │
    //  └───────────────────────────────────┘
    //  ┌───────────────────────────────────┐
    //  │  movimientos, inputs, colisiones  │
    //  └───────────────────────────────────┘

    if (keys.a.pressed && player.position.x >= 0) {
        player.velocity.x = -5
        player.rotation = -0.15
    } else if (keys.d.pressed && player.position.x + player.width <= canvas.width) {
        player.velocity.x = 5
        player.rotation = 0.15
    } else {
        player.velocity.x = 0
        player.rotation = 0
    }

    //  ┌───────────────────────────────────┐
    //  │             GameOver              │
    //  └───────────────────────────────────┘
}

animate()
// ______________________________________________________
//
//                      EVENT
// ______________________________________________________
//

window.addEventListener('keydown', ({ key }) => {
    switch (key) {
        case 'w':
            keys.w.pressed = true
            // lastkey = 'w'
            break
        case 'a':
            keys.a.pressed = true
            // lastkey = 'a'
            break
        case 's':
            keys.s.pressed = true
            // lastkey = 's'
            break
        case 'd':
            keys.d.pressed = true
            // lastkey = 'd'
            break
        case ' ':
            projectiles.push(new Projectile({
                position: {
                    x: player.position.x + player.width / 2,
                    y: player.position.y
                },
                velocity: {
                    x: 0, y: -10
                }
            })
            )
            // lastkey = 'd'
            console.log(projectiles)
            break
    }
    console.log(player.velocity)
})

window.addEventListener('keyup', ({ key }) => {
    switch (key) {
        case 'w':
            keys.w.pressed = false
            break
        case 'a':
            keys.a.pressed = false
            break
        case 's':
            keys.s.pressed = false
            break
        case 'd':
            keys.d.pressed = false
            break
    }
    // console.log(key)
})
