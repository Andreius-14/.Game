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
    constructor({ position }) {
        this.position = position
        this.width = 40
        this.height = 40
    }

    draw() {
        c.fillStyle = 'blue'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
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

// ______________________________________________________
//
//                      CONST
// ______________________________________________________
//

const map = [
    ['-', '-', '-', '-', '-', '-', '-'],
    ['-', ' ', '-', '-', '-', ' ', '-'],
    ['-', ' ', ' ', ' ', '-', ' ', '-'],
    ['-', ' ', '-', ' ', ' ', ' ', '-'],
    ['-', ' ', '-', '-', '-', ' ', '-'],
    ['-', '-', '-', '-', '-', '-', '-']
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
        switch (symbol) {
            case '-':
                boundaries.push(
                    // INSTANCIA: [j empieza en 0] - [i empieza en 0]
                    new Boundary({
                        position: {
                            x: Boundary.width * j,
                            y: Boundary.height * i
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

// function collition_circle_rectangle({ circle, rectangle }) {
//     return false
// }

// ______________________________________________________
//
//                      BUCLE
// ______________________________________________________
//

function animate() {
    requestAnimationFrame(animate)

    c.clearRect(0, 0, canvas.width, canvas.height)

    //
    boundaries.forEach((boundary) => {
        boundary.draw()
        // if (collition_circle_rectangle({ circle: player, rectangle: boundary })) {
        //
        // }
    })
    // Stop
    player.velocity.x = 0
    player.velocity.y = 0

    // Move
    if (keys.w.pressed && lastkey === 'w') player.velocity.y = -5
    if (keys.a.pressed && lastkey === 'a') player.velocity.x = -5
    if (keys.s.pressed && lastkey === 's') player.velocity.y = 5
    if (keys.d.pressed && lastkey === 'd') player.velocity.x = 5

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
