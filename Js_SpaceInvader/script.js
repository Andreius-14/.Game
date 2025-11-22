/* eslint indent: "off" */
/* eslint-disable space-before-function-paren */

// ______________________________________________________
//
//                      Base
// ______________________________________________________
//
const canvas = document.getElementById('canvas')
canvas.width = innerWidth
canvas.height = innerHeight

const c = canvas.getContext('2d')

// ______________________________________________________
//
//                    INSTANCIA
// ______________________________________________________
//

let lastkey = ''
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
//                       FUNCTION
// ______________________________________________________
//
class Grid {
    constructor() {
        this.position = { x: 0, y: 0 }
        this.velocity = { x: 3, y: 0 }
        this.invaders = []

        const columns = Math.floor(Math.random() * 10 + 5)
        const rows = Math.floor(Math.random() * 10 + 2)

        this.width = columns * 30
        this.height = rows * 30
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

        this.position.x += velocity.x
        this.position.y += velocity.y

        this.draw()

    }
}

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
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        this.draw()

    }
}

class Projectile {
    constructor({ position, velocity }) {
        this.position = position
        this.velocity = velocity
        this.radius = 5
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
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        this.draw()

    }
}
function getBounds(obj) {
    // Si es un círculo (tiene radius)
    if (obj.radius !== undefined) {
        const r = obj.radius
        return {
            left: obj.position.x - r,
            right: obj.position.x + r,
            top: obj.position.y - r,
            bottom: obj.position.y + r
        }
    }

    return {
        left: obj.position.x,
        right: obj.position.x + obj.width,
        top: obj.position.y,
        bottom: obj.position.y + obj.height
    }
}

// Ahora las funciones son súper simples y reutilizables
function collisionCanvasPiso(obj) {
    return getBounds(obj).bottom >= canvas.height
}

function collisionCanvasLados(obj) {
    const b = getBounds(obj)
    return b.left <= 0 || b.right >= canvas.width
}
function collitionCanvas(obj) {
    const a = getBounds(obj)
    return (
        a.left <= 0 ||
        a.top <= 0 ||
        a.right >= canvas.width ||
        a.bottom >= canvas.height
    )
}

function collitionObjetos(obj, obj2) {
    const a = getBounds(obj)
    const b = getBounds(obj2)
    return (
        // Superior
        a.top <= b.bottom &&
        // Izquierda
        a.left <= b.right &&
        // Inferior
        a.bottom >= b.top &&
        // Derecha
        a.right >= b.left

    )
}

// ______________________________________________________
//
//                      BUCLE
// ______________________________________________________

const player = new Player()
const projectiles = []
const grids = []
let frames = 0
let randomInterval = Math.floor(Math.random() * 500 + 500)
console.log(player)
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

    // ───────────── PLAYER ─────────────
    player.update()
    // ─────────── PROYECTIL ────────────
    projectiles.forEach((projectile, index) => {
        projectile.update()

        // COLICIONES - Bolita
        if (getBounds(projectile).bottom < 0) {
            setTimeout(() => {
                projectiles.splice(index, 1)
            }, 0)
        }
    })

    // ───────────── GRIDS ─────────────
    grids.forEach((grid) => {
        grid.update()

        // COLICIONES
        if (collisionCanvasLados(grid)) {
            // Invierte Movimiento
            grid.velocity.x = -grid.velocity.x
            if (!collisionCanvasPiso(grid)) {
                grid.velocity.y = 60
            }
        } else {
            grid.velocity.y = 0
        }

        grid.invaders.forEach((invader, i) => {
            invader.update({ velocity: grid.velocity })

            projectiles.forEach((projectile, j) => {

                if (collitionObjetos(projectile, invader)) {
                    setTimeout(() => {

                        const invaderFound = grid.invaders.find(
                            (invader2) => invader2 === invader
                        )

                        const projectileFound = projectiles.find(
                            (projectile2) => projectile2 === projectile
                        )

                        if (invaderFound && projectileFound) {
                            grid.invaders.splice(i, 1)
                            projectiles.splice(j, 1)

                        }
                    }, 0)
                }
            })
        })
    })
    //  ┌───────────────────────────────────┐
    //  │              LOGICA               │
    //  └───────────────────────────────────┘

    // ───────────── PLAYER ─────────────

    if (keys.a.pressed && player.position.x >= 0) {
        player.velocity.x = -5
    } else if (keys.d.pressed && player.position.x + player.width <= canvas.width) {
        player.velocity.x = 5
    } else {
        player.velocity.x = 0
        player.velocity.y = 0
    }
    // ───────────── GRIDS ─────────────
    if (frames % randomInterval === 0) {
        if (grids.length < 4) {
            grids.push(new Grid())
            randomInterval = Math.floor(Math.random() * 500 + 500)
            frames = 0
            // console.log(randomInterval)
        }
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
            lastkey = 'w'
            break
        case 'a':
            keys.a.pressed = true
            lastkey = 'a'
            break
        case 's':
            keys.s.pressed = true
            lastkey = 's'
            break
        case 'd':
            keys.d.pressed = true
            lastkey = 'd'
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
    // console.log(player.velocity)
    // console.log(getBounds(player))
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
