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
//                      CLASS
// ______________________________________________________
//
// PERSONAJES
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
    }

    update() {
        if (!this.image) return
        this.draw()
        this.position.x += this.velocity.x
    }
}

class Invader {
    constructor({ position }) {
        this.velocity = { x: 0, y: 0 }

        const url = './Shaders/invader.png'
        const image = new Image()
        image.src = url
        image.onload = () => {
            const scale = 1
            this.image = image
            this.width = image.width * scale
            this.height = image.height * scale

            this.position = {
                x: position.x,
                y: position.y
            }
        }
    }

    draw() {
        c.drawImage(
            this.image,
            this.position.x,
            this.position.y,
            this.width,
            this.height)
    }

    update({ velocity }) {
        if (!this.image) return

        this.draw()
        this.position.x += velocity.x
        this.position.y += velocity.y

    }
}

//
// ELEMENTOS
//

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



class Grid {
    constructor() {
        this.position = { x: 0, y: 0 }
        this.velocity = { x: 3, y: 0 }
        this.invaders = []

        const columns = Math.floor(Math.random() * 10 + 5)
        const rows = Math.floor(Math.random() * 10 + 2)

        this.width = columns * 30

        for (let x = 0; x < columns; x++) {
            for (let y = 0; y < rows; y++) {
                this.invaders.push(
                    new Invader({
                        position: { x: x * 30, y: y * 30 },
                        offsetX: x * 30,
                        offsetY: y * 30
                    })
                )
            }
        }
        console.log(this.invaders)
    }

    update() {
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
//                    INSTANCIA
// ______________________________________________________
//
const player = new Player()
const projectiles = []
// const invader = new Invader()

const grids = []
//
// ______________________________________________________
//
//                      BUCLE
// ______________________________________________________
//
let frames = 0
let randomInterval = Math.floor(Math.random() * 500 + 500)

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
    // invader.update()
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

    grids.forEach((grid) => {

        grid.update()

        grid.invaders.forEach((invader) => {
            invader.update({ velocity: grid.velocity })
        })

        if (grid.position.x + grid.width >= canvas.width || grid.position.x <= 0) {
            grid.velocity.x = -grid.velocity.x
            grid.velocity.y = 30
        } else {

            grid.velocity.y = 0
        }


        // console.log(grids)
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
    //

    if (frames % randomInterval == 0) {
        grids.push(new Grid)
        randomInterval = Math.floor(Math.random() * 500 + 500)
        frames = 0
        console.log(randomInterval)
    }
    frames++
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
