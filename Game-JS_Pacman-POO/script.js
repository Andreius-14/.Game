/* eslint indent: "off" */
/* eslint-disable space-before-function-paren */

import { makeCanvas } from './Shared-js/core/shared-Canvas.js'

// ______________________________________________________
//
//                      Base
// ______________________________________________________
//
const scorehtml = document.querySelector('#score_ele')
const canvas = makeCanvas({ width: innerWidth, height: innerHeight })
const c = canvas.getContext('2d')

document.body.appendChild(canvas)

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

class Ghost {
    static speed = 2
    constructor({ position, velocity, color = 'red' }) {
        this.position = position
        this.velocity = velocity
        this.radius = 15
        this.color = color
        this.prevCollisions = []
        this.speed = 2
        this.scared = false
    }

    draw() {
        c.beginPath()
        c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
        c.fillStyle = this.scared ? 'blue' : this.color
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

class PowerUp {
    constructor({ position }) {
        this.position = position
        this.radius = 10
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
    const padding = Boundary.width / 2 - circle.radius - 1
    return (
        // Mi Cara Izquierda <Choca> PARED Derecha
        circle.position.x - circle.radius + circle.velocity.x <= (rectangle.position.x + rectangle.width + padding) &&
        // Mi Cara Superior <choca> PARED INFERIOR
        circle.position.y - circle.radius + circle.velocity.y <= (rectangle.position.y + rectangle.height + padding) &&

        // Mi Cara Derecha <choca> PARED Izquierda
        circle.position.x + circle.radius + circle.velocity.x >= rectangle.position.x - padding &&
        // Mi Cara Inferior <choca> PARED SUPERIOR
        circle.position.y + circle.radius + circle.velocity.y >= rectangle.position.y - padding

    )
}

function anulaGiroAnteColision({ x = 0, y = 0 }) {
    for (const boundary of boundaries) {
        if (collition_circle_rectangle({
            // Prevee una situacion Futura
            circle: { ...player, velocity: { x, y } },
            rectangle: boundary
        })) {
            // Collision: No se efecutara el Movimiento
            if (x !== 0) player.velocity.x = 0
            if (y !== 0) player.velocity.y = 0
            return
        }
    }

    // No Collision
    if (x !== 0) player.velocity.x = x
    if (y !== 0) player.velocity.y = y
}
function collitionGhost(fantasma, rectangle, { x = 0, y = 0, array = [], msm = '' } = {}) {
    if (!array.includes(msm) && collition_circle_rectangle({
        circle: {
            ...fantasma,
            velocity: {
                x,
                y
            }
        },
        rectangle
    })
    ) {
        array.push(msm)
    }
}

function collitionObj(main, objChocado) {
    return (Math.hypot(
        main.position.x - objChocado.position.x,
        main.position.y - objChocado.position.y
    ) < main.radius + objChocado.radius)
}
// ______________________________________________________
//
//                      CONST
// ______________________________________________________
//
// ↓↑←→
const map = [
    ['1', '=', '=', '=', '=', '=', '=', '=', '=', '=', '=', '=', '=', '=', '=', '=', '=', '=', '=', '=', '2'],
    ['|', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', 'p', '|'],
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
    ['|', 'p', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', 'p', '|'],
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
let score = 0
const boundaries = []
const pallets = []
const powersUps = []
const bloque = '⯀'

// ______________________________________________________
//
//                    INSTANCIA
// ______________________________________________________
//
const ghosts = [
    new Ghost({
        position: {
            x: Boundary.width * 6 + Boundary.width / 2,
            y: Boundary.height * 5 + Boundary.height / 2
        },
        velocity: {
            x: 5,
            y: 0
        }
    }
    ),
    new Ghost({
        position: {
            x: Boundary.width * 6 + Boundary.width / 2,
            y: Boundary.height * 5 + Boundary.height / 2
        },
        velocity: {
            x: 5,
            y: 0
        },
        color: 'white'
    }
    ),
    new Ghost({
        position: {
            x: Boundary.width * 6 + Boundary.width / 2,
            y: Boundary.height * 5 + Boundary.height / 2
        },
        velocity: {
            x: 5,
            y: 0
        },
        color: 'yellow'
    }
    ),
    new Ghost({
        position: {
            x: Boundary.width * 6 + Boundary.width / 2,
            y: Boundary.height * 5 + Boundary.height / 2
        },
        velocity: {
            x: 5,
            y: 0
        },
        color: 'blue'
    }
    )
]

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
            case 'p':
                powersUps.push(
                    // INSTANCIA: [j empieza en 0] - [i empieza en 0]
                    new PowerUp({
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
//                      BUCLE
// ______________________________________________________
//
let animationID
function animate() {
    animationID = requestAnimationFrame(animate)
    // console.log(animationID)
    c.clearRect(0, 0, canvas.width, canvas.height)
    // Move
    // COLISION PLAYER - Wall
    if (keys.w.pressed && lastkey === 'w') {
        anulaGiroAnteColision({ x: 0, y: -5 })
    }
    if (keys.a.pressed && lastkey === 'a') {
        anulaGiroAnteColision({ x: -5, y: 0 })
    }
    if (keys.s.pressed && lastkey === 's') {
        anulaGiroAnteColision({ x: 0, y: 5 })
    }
    if (keys.d.pressed && lastkey === 'd') {
        anulaGiroAnteColision({ x: 5, y: 0 })
    }

    for (let i = ghosts.length - 1; i >= 0; i--) {
        const ghost = ghosts[i]
        ghost.draw()

        // COLISION GHOST - PACMAN
        if (collitionObj(ghost, player)) {
            if (ghost.scared) {
                console.log('choco azul')
                ghosts.splice(i, 1)
            } else {
                window.cancelAnimationFrame(animationID)
                console.log('Looser')
                // console.log(scorehtml)
            }
        }
    }

    // DRAW - POWER-UP
    for (let i = powersUps.length - 1; i >= 0; i--) {
        const powersUp = powersUps[i]
        powersUp.draw()

        // Colicion PowerUp - PACMAN
        if (collitionObj(powersUp, player)) {
            powersUps.splice(i, 1)
            ghosts.forEach(ghost => {
                ghost.scared = true
                console.log(ghost.scared)

                setTimeout(() => {
                    ghost.scared = false
                }, 3000)
            })
        }
    }
    // DRAW
    for (let i = 0; i < pallets.length; i++) {
        const pallet = pallets[i]
        pallet.draw()

        // Colicion Bolas - PACMAN
        if (collitionObj(pallet, player)) {
            pallets.splice(i, 1)

            score += 10
            scorehtml.innerHTML = `${score}`

            // console.log('Touching', score)
            // console.log(scorehtml)
        }
    }

    // Draw
    boundaries.forEach((boundary) => {
        boundary.draw()

        if (collition_circle_rectangle({ circle: player, rectangle: boundary })) {
            // console.log('You are colliding')
            // Stop
            player.velocity.x = 0
            player.velocity.y = 0
        }
    })

    // Draw
    ghosts.forEach(ghost => {
        ghost.update()

        const collitions = []

        // COLISION GHOST - Wall
        boundaries.forEach((boundary) => {
            collitionGhost(ghost, boundary, { array: collitions, msm: 'up', y: -ghost.speed })
            collitionGhost(ghost, boundary, { array: collitions, msm: 'down', y: ghost.speed })
            collitionGhost(ghost, boundary, { array: collitions, msm: 'left', x: -ghost.speed })
            collitionGhost(ghost, boundary, { array: collitions, msm: 'right', x: ghost.speed })
        })

        if (collitions.length > ghost.prevCollisions.length) {
            ghost.prevCollisions = collitions
        }

        if (JSON.stringify(collitions) !== JSON.stringify(ghost.prevCollisions)) {
            if (ghost.velocity.x > 0) ghost.prevCollisions.push('right')
            else if (ghost.velocity.x < 0) ghost.prevCollisions.push('left')
            else if (ghost.velocity.y < 0) ghost.prevCollisions.push('up')
            else if (ghost.velocity.y > 0) ghost.prevCollisions.push('down')

            // console.log(collitions)
            // console.log(ghost.prevCollisions)

            const pathways = ghost.prevCollisions.filter((collition
            ) => {
                return !collitions.includes(collition)
            })

            // console.log({ pathways })

            const direction = pathways[Math.floor(Math.random() * pathways.length)]

            // console.log({ direction })

            switch (direction) {
                case 'down':
                    ghost.velocity.y = ghost.speed
                    ghost.velocity.x = 0
                    break
                case 'up':
                    ghost.velocity.y = -ghost.speed
                    ghost.velocity.x = 0
                    break
                case 'right':
                    ghost.velocity.y = 0
                    ghost.velocity.x = ghost.speed
                    break
                case 'left':
                    ghost.velocity.y = 0
                    ghost.velocity.x = -ghost.speed
                    break
            }

            ghost.prevCollisions = []
        }
        // console.log(collition)
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
    // console.log(player.velocity)
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
