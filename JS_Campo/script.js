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

const foregroundImage = new Image()
foregroundImage.src = './img/foregroundObjects.png'

// ── Cargar Player ──

const playerImage = new Image()
playerImage.src = './img/playerDown.png'

const playerDownImage = new Image()
playerDownImage.src = './img/playerDown.png'

const playerUpImage = new Image()
playerUpImage.src = './img/playerUp.png'

const playerLeftImage = new Image()
playerLeftImage.src = './img/playerLeft.png'

const playerRightImage = new Image()
playerRightImage.src = './img/playerRight.png'

// canvas.width / 2 - this.image.width / 4 / 2,
// canvas.height / 2 - this.image.height / 2,

//          ╭─────────────────────────────────────────────────────────╮
//          │                       Instancias                        │
//          ╰─────────────────────────────────────────────────────────╯

// ── Intancia - Collitions ───────────────────────────────────────────

//    [array]
//      🡇
//    [grid]
//      🡇
//  [Instancia]

for (let i = 0; i < collisions.length; i += 70) {
    collisionsMap.push(collisions.slice(i, 70 + i))
}

collisionsMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 1025) {
            boundaries.push(
                new Boundary({
                    position: {
                        x: j * Boundary.width + offset.x,
                        y: i * Boundary.height + offset.y
                    }
                })
            )
        }
    })
})

// ── Instancia - Personaje ───────────────────────────────────────────
const player = new Sprite({
    position: {
        x: canvas.width / 2 - 192 / 4 / 2,
        y: canvas.height / 2 - 68 / 2

    },
    image: playerDownImage,
    frames: {
        max: 4
    },
    sprites: {
        up: playerUpImage,
        left: playerLeftImage,
        right: playerRightImage,
        down: playerDownImage
    }
})

// ── Intancia - Tierras ──────────────────────────────────────────────
const background = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
    },
    image
})

const foreground = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
    },
    image: foregroundImage
})
const movables = [background, ...boundaries, foreground]

//          ╭─────────────────────────────────────────────────────────╮
//          │                        Function                         │
//          ╰─────────────────────────────────────────────────────────╯
function getBounds(obj) {
    if (!obj || !obj.position) {
        console.log('No cargado')
        return null
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

function willCollide({ x = 0, y = 0, user = player, bound = boundaries }) {
    const future = { x: user.position.x + x, y: user.position.y + y }
    const main = { ...user, position: future }
    return bound.some(boundary => collitionObjetos(main, boundary))
}
// ╭─────────────────────────────────────────────────────────╮
// │                     Bucle Principal                     │
// ╰─────────────────────────────────────────────────────────╯

const velocidad = 3

function animate() {
    //  ┌───────────────────────────────────┐
    //  │              Bucle                │
    //  └───────────────────────────────────┘
    window.requestAnimationFrame(animate)

    //  ┌───────────────────────────────────┐
    //  │             UPDATE                │
    //  └───────────────────────────────────┘

    background.draw()
    boundaries.forEach(boundary => {
        boundary.draw()
    })

    player.draw()
    foreground.draw()
    //  ┌───────────────────────────────────┐
    //  │              LOGICA               │
    //  └───────────────────────────────────┘

    // === Lógica de movimiento simplificada ===
    let direction = null
    let dx = 0
    let dy = 0

    player.moving = false

    if (keys.w.pressed && lastKey === 'w') {
        direction = 'up'
        dy = -velocidad
    } else if (keys.a.pressed && lastKey === 'a') {
        direction = 'left'
        dx = -velocidad
    } else if (keys.s.pressed && lastKey === 's') {
        direction = 'down'
        dy = velocidad
    } else if (keys.d.pressed && lastKey === 'd') {
        direction = 'right'
        dx = velocidad
    }

    if (direction) {
        player.moving = true
        player.image = player.sprites[direction]

        if (!willCollide({ x: dx, y: dy })) {
            movables.forEach(m => {
                m.position.x -= dx
                m.position.y -= dy
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
