/* eslint indent: "off" */
/* eslint-disable space-before-function-paren */

// ╭─────────────────────────────────────────────────────────╮
// │                          Base                           │
// ╰─────────────────────────────────────────────────────────╯
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

c.fillStyle = 'white'
c.fillRect(0, 0, canvas.width, canvas.height)

// ╭─────────────────────────────────────────────────────────╮
// │                        Variables                        │
// ╰─────────────────────────────────────────────────────────╯
let lastKey = ''

const collisionsMap = []

const boundaries = []
const offset = {
    x: -735,
    y: -650
}

const keys = {
    w: { pressed: false },
    a: { pressed: false },
    s: { pressed: false },
    d: { pressed: false }
}
// ── Cargar Imagenes ──
const image = new Image()
image.src = './img/Pellet Town.png'

const playerImage = new Image()
playerImage.src = './img/playerDown.png'




// ╭─────────────────────────────────────────────────────────╮
// │                         Clases                          │
// ╰─────────────────────────────────────────────────────────╯
class Boundary {
    static width = 48
    static height = 48
    constructor({ position }) {
        this.position = position
        this.width = 48
        this.height = 48
    }

    draw() {
        c.fillStyle = 'rgba(255,0,0,0.0)'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}

class Sprite {
    constructor({ position, velocity, image, frames = { max: 1 } }) {
        this.position = position
        this.image = image
        this.frames = frames

        this.image.onload = () => {
            this.width = this.image.width / this.frames.max
            this.height = this.image.height
        }
    }

    draw() {
        c.drawImage(
            this.image,
            0,
            0,
            this.image.width / this.frames.max,
            this.image.height,
            this.position.x,
            this.position.y,
            this.image.width / this.frames.max,
            this.image.height
        )
    }
}

// canvas.width / 2 - this.image.width / 4 / 2,
// canvas.height / 2 - this.image.height / 2,

//          ╭─────────────────────────────────────────────────────────╮
//          │                       Instancias                        │
//          ╰─────────────────────────────────────────────────────────╯
for (let i = 0; i < collisions.length; i += 70) {
    collisionsMap.push(collisions.slice(i, 70 + i))
}

collisionsMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 1025)
            boundaries.push(
                new Boundary({
                    position: {
                        x: j * Boundary.width + offset.x,
                        y: i * Boundary.height + offset.y
                    }
                })
            )
    })
})

const player = new Sprite({
    position: {
        x: canvas.width / 2 - 192 / 4 / 2,
        y: canvas.height / 2 - 68 / 2

    },
    image: playerImage,
    frames: {
        max: 4
    }
})


const background = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
    },
    image
})


const movables = [background, ...boundaries]

//          ╭─────────────────────────────────────────────────────────╮
//          │                        Function                         │
//          ╰─────────────────────────────────────────────────────────╯
function getBounds(obj) {
    if (!obj || !obj.position) {
        console.log('No cargado')
        return null
    }
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

function collitionObjetos(obj, obj2) {
    const a = getBounds(obj)
    const b = getBounds(obj2)
    if (!a || !b) return false
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
// ╭─────────────────────────────────────────────────────────╮
// │                     Bucle Principal                     │
// ╰─────────────────────────────────────────────────────────╯
function animate() {
    //  ┌───────────────────────────────────┐
    //  │              Bucle                │
    //  └───────────────────────────────────┘    
    window.requestAnimationFrame(animate)

    //  ┌───────────────────────────────────┐
    //  │             UPDATE                │
    //  └───────────────────────────────────┘

    background.draw()
    player.draw()
    boundaries.forEach(boundary => {
        boundary.draw()

    })


    //  ┌───────────────────────────────────┐
    //  │              LOGICA               │
    //  └───────────────────────────────────┘


    let moving = true
    if (keys.w.pressed && lastKey === 'w') {
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if (
                collitionObjetos(player,
                    {
                        ...boundary,
                        position: {
                            x: boundary.position.x,
                            y: boundary.position.y + 3
                        }
                    }
                )
            ) {
                moving = false
                break
            }
        }

        if (moving) {
            movables.forEach((movable) => {
                movable.position.y += 3
            })
        }
    } else if (keys.a.pressed && lastKey === 'a') {
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if (
                collitionObjetos(player,
                    {
                        ...boundary,
                        position: {
                            x: boundary.position.x + 3,
                            y: boundary.position.y
                        }
                    }
                )
            ) {
                moving = false
                break
            }
        }

        if (moving) {
            movables.forEach((movable) => {
                movable.position.x += 3
            })
        }
    } else if (keys.s.pressed && lastKey === 's') {
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if (
                collitionObjetos(player,
                    {
                        ...boundary,
                        position: {
                            x: boundary.position.x,
                            y: boundary.position.y - 3
                        }
                    }
                )
            ) {
                moving = false
                break
            }
        }

        if (moving) {
            movables.forEach((movable) => {
                movable.position.y -= 3
            })
        }
    } else if (keys.d.pressed && lastKey === 'd') {
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if (
                collitionObjetos(player,
                    {
                        ...boundary,
                        position: {
                            x: boundary.position.x - 3,
                            y: boundary.position.y
                        }
                    }
                )
            ) {
                moving = false
                break
            }
        }

        if (moving) {
            movables.forEach((movable) => {
                movable.position.x -= 3
            })
        }
    }
}
animate()

// ╭─────────────────────────────────────────────────────────╮
// │                         Eventos                         │
// ╰─────────────────────────────────────────────────────────╯
window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'w':
            keys.w.pressed = true
            lastKey = 'w'
            break
        case 'a':
            keys.a.pressed = true
            lastKey = 'a'
            break
        case 's':
            keys.s.pressed = true
            lastKey = 's'
            break
        case 'd':
            keys.d.pressed = true
            lastKey = 'd'
            break
    }
})

window.addEventListener('keyup', (e) => {
    switch (e.key) {
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
})
