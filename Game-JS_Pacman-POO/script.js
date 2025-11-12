/* eslint indent: "off" */
/* eslint-disable space-before-function-paren */

import { makeCanvas } from './Shared-js/core/shared-Canvas.js'
import { _insertar } from './Shared-js/core/shared-Dom.js'

const canvas = makeCanvas({ width: innerWidth, height: innerHeight })
const c = canvas.getContext('2d')

_insertar(document.body, canvas)

// ______________________________________________________
//
//                      CLASS
// ______________________________________________________
//
class Boundary {
    static width = 40
    static height = 40
    constructor({ position, image }) {
        this.position = position
        this.width = 40
        this.height = 40
        this.image = image
    }

    draw() {
        // c.fillStyle = 'blue'
        // c.fillRect(this.position.x, this.position.y, this.width, this.height)
        c.drawImage(this.image, this.position.x, this.position.y)
    }
}

class Player {
    constructor({ position, velocity }) {
        this.position = position
        this.velocity = velocity
        this.radius = 15
    }

    draw() {
        c.beginPath()
        c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
        c.fillStyle = 'yellow'
        c.fill()
        c.closePath()
    }

    update() {
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }
}

class Pallet {
    constructor({ position }) {
        this.position = position
        this.radius = 3
    }

    draw() {
        c.beginPath()
        c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
        c.fillStyle = 'white'
        c.fill()
        c.closePath()
    }
}

// ______________________________________________________
//
//                      CONST
// ______________________________________________________
//

// const map = [
//     ['1', '=', '=', '=', '=', '=', '2'],
//     ['|', ' ', ' ', ' ', ' ', ' ', '|'],
//     ['|', ' ', ' ', ' ', ' ', ' ', '|'],
//     ['|', ' ', '1', '-', '2', ' ', '|'],
//     ['|', ' ', '{', '+', '}', ' ', '|'],
//     ['|', ' ', '4', '_', '3', ' ', '|'],
//     ['|', ' ', ' ', ' ', ' ', ' ', '|'],
//     ['|', ' ', ' ', ' ', ' ', ' ', '|'],
//     ['4', '=', '=', '=', '=', '=', '3']
// ]

// ↓↑←→
const map = [
    ['1', '=', '=', '=', '=', '=', '=', '=', '=', '=', '=', '=', '=', '=', '=', '=', '=', '=', '=', '=', '2'],
    ['|', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '|'],
    ['|', '.', '⯀', '.', '^', '.', '⯀', '.', '⯀', '.', '^', '.', '⯀', '.', '⯀', '.', '^', '.', '⯀', '.', '|'],
    ['|', '.', '.', '.', '|', '.', '.', '.', '.', '.', '|', '.', '.', '.', '.', '.', '|', '.', '.', '.', '|'],
    ['|', '.', '⯀', '.', '|', '.', '⯀', '.', '⯀', '.', '|', '.', '⯀', '.', '⯀', '.', '|', '.', '⯀', '.', '|'],
    ['|', '.', '.', '.', 'v', '.', '.', '.', '.', '.', 'v', '.', '.', '.', '.', '.', 'v', '.', '.', '.', '|'],
    ['|', '.', '^', '.', '.', '.', '^', '.', '^', '.', '.', '.', '^', '.', '^', '.', '.', '.', '^', '.', '|'],
    ['|', '.', '4', '=', '=', '=', '3', '.', '4', '=', '=', '=', '3', '.', '4', '=', '=', '=', '3', '.', '|'],
    ['|', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '|'],
    ['|', '.', '1', '>', '.', '<', '2', '.', '1', '>', '.', '<', '2', '.', '1', '>', '.', '<', '2', '.', '|'],
    ['|', '.', 'v', '.', '.', '.', 'v', '.', 'v', '.', '.', '.', 'v', '.', 'v', '.', '.', '.', 'v', '.', '|'],
    ['|', '.', '.', '.', '^', '.', '.', '.', '.', '.', '^', '.', '.', '.', '.', '.', '^', '.', '.', '.', '|'],
    ['|', '.', '⯀', '.', '|', '.', '⯀', '.', '⯀', '.', '|', '.', '⯀', '.', '⯀', '.', '|', '.', '⯀', '.', '|'],
    ['|', '.', '.', '.', '|', '.', '.', '.', '.', '.', '|', '.', '.', '.', '.', '.', '|', '.', '.', '.', '|'],
    ['|', '.', '⯀', '.', 'v', '.', '⯀', '.', '⯀', '.', 'v', '.', '⯀', '.', '⯀', '.', 'v', '.', '⯀', '.', '|'],
    ['|', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '|'],
    ['4', '=', '=', '=', '=', '=', '=', '=', '=', '=', '=', '=', '=', '=', '=', '=', '=', '=', '=', '=', '3']
]
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
    }
}

let lastkey = ''

const boundaries = []

const pallets = []
const bloque = '⯀'

// const image = new Image()
// image.src = './assets/pipeHorizontal.png'
// ______________________________________________________
//
//                    INSTANCIA
// ______________________________________________________
//

const player = new Player({
    position: {
        x: Boundary.width + Boundary.width / 2,
        y: Boundary.height + Boundary.height / 2
    },
    velocity: {
        x: 0,
        y: 0
    }
})

// Recorre map
map.forEach((row, i) => {
    row.forEach((symbol, j) => {
        const src = './assets/block.png'
        // console.log(src)
        switch (symbol) {
            case bloque: insertImg(i, j, src)
                break
            case '1': insertImg(i, j, './assets/pipeCorner1.png')
                break
            case '2': insertImg(i, j, './assets/pipeCorner2.png')
                break
            case '3': insertImg(i, j, './assets/pipeCorner3.png')
                break
            case '4': insertImg(i, j, './assets/pipeCorner4.png')
                break
            case '|': insertImg(i, j, './assets/pipeVertical.png')
                break
            case '=': insertImg(i, j, './assets/pipeHorizontal.png')
                break
            case '+': insertImg(i, j, './assets/pipeCross.png')
                break
            case '^': insertImg(i, j, './assets/capTop.png')
                break
            case '>': insertImg(i, j, './assets/capRight.png')
                break
            case 'v': insertImg(i, j, './assets/capBottom.png')
                break
            case '<': insertImg(i, j, './assets/capLeft.png')
                break
            case '-': insertImg(i, j, './assets/pipeConnectorBottom.png')
                break
            case '_': insertImg(i, j, './assets/pipeConnectorTop.png')
                break
            case '}': insertImg(i, j, './assets/pipeConnectorLeft.png')
                break
            case '{': insertImg(i, j, './assets/pipeConnectorRight.png')
                break
            case '.':
                pallets.push(
                    // INSTANCIA: [j empieza en 0] - [i empieza en 0]
                    new Pallet({
                        position: {
                            x: j * Boundary.width + Boundary.width / 2,
                            y: i * Boundary.height + Boundary.height / 2
                        }

                    })
                )
                break
        }
    })
})
// ______________________________________________________
//
//                       FUNCTION
// ______________________________________________________
//

function insertImg(i, j, src) {
    boundaries.push(
        // INSTANCIA: [j empieza en 0] - [i empieza en 0]
        new Boundary({
            position: {
                x: Boundary.width * j,
                y: Boundary.height * i
            },
            image: makeImage(src)

        })
    )
}

function makeImage(src) {
    const image = new Image()
    image.src = src
    return image
}

function collition_circle_rectangle({ circle, rectangle }) {
    return (
        // Mi Cara Izquierda <Choca> PARED Derecha
        circle.position.x - circle.radius + circle.velocity.x <= (rectangle.position.x + rectangle.width) &&
        // Mi Cara Superior <choca> PARED INFERIOR
        circle.position.y - circle.radius + circle.velocity.y <= (rectangle.position.y + rectangle.height) &&

        // Mi Cara Derecha <choca> PARED Izquierda
        circle.position.x + circle.radius + circle.velocity.x >= rectangle.position.x &&
        // Mi Cara Inferior <choca> PARED SUPERIOR
        circle.position.y + circle.radius + circle.velocity.y >= rectangle.position.y

    )
}

// function dropSrc(i, j, array = map) {
// i = row = fila ----   j = column = columna
// const main = map[i]?.[j]
// const up = map[i - 1]?.[j]
// const down = map[i + 1]?.[j]
// const right = map[i]?.[j + 1]
// const left = map[i]?.[j - 1]
//
// const right_up = map[i - 1]?.[j + 1]
// const right_down = map[i + 1]?.[j + 1]
// const left_up = map[i - 1]?.[j - 1]
// const left_down = map[i + 1]?.[j - 1]
//
// const group = [up, down, right, left, right_up, right_down, left_up, left_down]
//
// function bool_elegidosLlenos(elegidos = [], contenidoElegido = bloque, conjunto = group) {
//     const ban = new Set(elegidos)
//     const grupoSinElegidos = conjunto.filter(x => !ban.has(x))
//
//     const ok__Elegidos = elegidos.every(el => el === contenidoElegido)
//     const ok__Resto = grupoSinElegidos.every(el => el === " ")
//
//     return ok__Elegidos && ok__Resto
// }
//
//
// return './assets/block.png'
// }

// dropImage(1, 1)
// ______________________________________________________
//
//                      BUCLE
// ______________________________________________________
//

function animate() {
    window.requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)
    // Move
    if (keys.w.pressed && lastkey === 'w') {
        for (const boundary of boundaries) {
            if (collition_circle_rectangle({
                // Prevee una situacion Futura
                circle: { ...player, velocity: { x: 0, y: -5 } },
                rectangle: boundary
            })) {
                // No se efecutara el Movimiento
                player.velocity.y = 0
                break
            } else {
                player.velocity.y = -5
            }
        }

        // player.velocity.y = -5
    }
    if (keys.a.pressed && lastkey === 'a') {
        for (const boundary of boundaries) {
            if (collition_circle_rectangle({
                // Prevee una situacion Futura
                circle: { ...player, velocity: { x: -5, y: 0 } },
                rectangle: boundary
            })) {
                player.velocity.x = 0
                break
            } else {
                player.velocity.x = -5
            }
        }

        // player.velocity.x = -5
    }
    if (keys.s.pressed && lastkey === 's') {
        for (const boundary of boundaries) {
            if (collition_circle_rectangle({
                // Prevee una situacion Futura
                circle: { ...player, velocity: { x: 0, y: 5 } },
                rectangle: boundary
            })) {
                player.velocity.y = 0
                break
            } else {
                player.velocity.y = 5
            }
        }
        // player.velocity.y = 5
    }
    if (keys.d.pressed && lastkey === 'd') {
        for (const boundary of boundaries) {
            if (collition_circle_rectangle({
                circle: { ...player, velocity: { x: 5, y: 0 } },
                rectangle: boundary
            })) {
                player.velocity.x = 0
                break
            } else {
                player.velocity.x = 5
            }
        }
    }

    // DRAW

    for (let i = 0; i < pallets.length; i++) {
        const pallet = pallets[i]
        pallet.draw()

        if (
            Math.hypot(
                pallet.position.x - player.position.x,
                pallet.position.y - player.position.y
            ) <
            pallet.radius + player.radius
        ) {
            console.log('Touching')
            pallets.splice(i, 1)
        }
    }

    boundaries.forEach((boundary) => {
        boundary.draw()

        if (collition_circle_rectangle({ circle: player, rectangle: boundary })) {
            console.log('You are colliding')
            // Stop
            player.velocity.x = 0
            player.velocity.y = 0
        }
    })

    player.update()
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
