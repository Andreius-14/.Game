/* eslint indent: "off" */
/* eslint-disable space-before-function-paren */

// Javascripts

// funcion especial para el bucle Infinito
// ┌───────────────────────────────────┐
// │               Main                │
// └───────────────────────────────────┘
// let lastTime = 0
// let dropCounter = 0
// let animationID = null
// const gameOver = false
// function animate(time = 0) {
//     // Detener Juego
//     if (gameOver) {
//         window.cancelAnimationFrame(animationID)
//         return
//     }
//
//     const deltaTime = time - lastTime
//     lastTime = time
//
//
//     // --- update(deltaTime)
//     // --- draw()
//
//     // Frame
//     animationID = window.requestAnimationFrame(animate)
// }
//
// animate()

// ┌───────────────────────────────────┐
// │               Main                │
// └───────────────────────────────────┘


let lastTime = 0
let animationID = null
let gameOver = false

// -------------------------------------------------
//                 MAIN LOOP (GAME)
// -------------------------------------------------
function gameLoop(time = 0) {
    if (gameOver) {
        cancelAnimationFrame(animationID)
        return
    }

    const deltaTime = time - lastTime
    lastTime = time

    update(deltaTime)
    draw()

    animationID = requestAnimationFrame(gameLoop)
}

// -------------------------------------------------
//                    UPDATE
// -------------------------------------------------
function update(dt) {
    // Aquí mueves cosas, físicas, colisiones, IA…
    // player.x += player.vel * dt
}

// -------------------------------------------------
//                    DRAW
// -------------------------------------------------
function draw() {
    // Aquí dibujas todo en el canvas
    // ctx.clearRect(0, 0, canvas.width, canvas.height)
    // ctx.fillRect(player.x, player.y, 20, 20)
}

// start
gameLoop()


// ┌───────────────────────────────────┐
// │           Centrar CANVAS          │
// └───────────────────────────────────┘
//
const cellSize = 40
const _width = map[0].length * cellSize
const _height = map.length * cellSize

// ______________________________________________________
//
//                      Base
// ______________________________________________________
//
const canvas = document.getElementById('canvas')
canvas.width = _width
canvas.height = _height

