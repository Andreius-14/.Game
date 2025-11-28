/* eslint indent: "off" */
/* eslint-disable space-before-function-paren */


// ┌───────────────────────────────────┐
// │             Reescalar             │
// └───────────────────────────────────┘
// Escálalo con CSS nomás. Es lo más chill.
//
//

// ┌───────────────────────────────────┐
// │          Reescalar GRID           │
// └───────────────────────────────────┘

//
// El tamaño del Canvas solo lo limitamos en CSS
// El el Js se establece con el tamaño del height Y width de la pantalla
//
/*
 *
 body {
  margin: 0;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  height: 100vh;
  width: 100%;
  background-color: black;
}

/*[Capa de Contension]
#canvas {
    // CUADRADO PERFECTO
    max - width: var(--tamaño - ancho);
    max - height: calc(var(--tamaño - ancho));
}
*/


/*

// Tamaño por [x][y]
const cellSize = 40
const _width = map[0].length * cellSize
const _height = map.length * cellSize

// Tamaño por [Canvas]
const canvas = document.getElementById('canvas')
canvas.width = _width
canvas.height = _height

*/

// ┌───────────────────────────────────┐
// │          Reescalar !GRID           │
// └───────────────────────────────────┘


// window.addEventListener('resize', () => {
//     canvas.width = innerWidth
//     canvas.height = innerHeight
//
// }

// ┌───────────────────────────────────┐
// │             IMAGENES              │
// └───────────────────────────────────┘
/*
class Boundary {
    static width = 40
    static height = 40
    constructor({ position, image }) {
        this.position = position
        this.width = 40
        this.height = 40
        // ES esta situacion La variable imagen de Boundary Es un spacio
        //  se asigna un html         <image>
        //  se asigna un instancia    new Image()
        //  El asignado debe contar con su Url

        this.image = image
    }

    // SU draw es Especial para Imagen
    draw() {
        // c.fillStyle = 'blue'
        // c.fillRect(this.position.x, this.position.y, this.width, this.height)
        c.drawImage(this.image, this.position.x, this.position.y)
    }
}
*/
function makeImage(src) {
    const image = new Image()
    image.src = src
    return image
}


// ┌───────────────────────────────────┐
// │             CLASES                │
// └───────────────────────────────────┘

/*  Funciones:
 *      constructor()
 *
 *      draw()    Por personaje Move
 *           
 *           
 *           
 *           
 *      update()  por Personaje Move    
 *           Contiene this.draw()
 *          
 *           
 *
 *  Instancias:
 *      Array -- Grupo de Instancias
 *      const -- Una Instancia
 *
 *      Ambas se dibujan en el bucle Animate()
 *
 *
 *
 *
 *
 * */
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
    //  ┌───────────────────────────────────┐
    //  │              Bucle                │
    //  └───────────────────────────────────┘    
    //     
    // animationID = requestAnimationFrame(gameLoop)

    //  ┌───────────────────────────────────┐
    //  │          Limpiar Canvas           │
    //  └───────────────────────────────────┘    
    //
    // c.clearRect(0, 0, canvas.width, canvas.height)
    // c.fillStyle = 'black'
    // c.fillRect(0, 0, canvas.width, canvas.height)


    //  ┌───────────────────────────────────┐
    //  │              LOGICA               │
    //  └───────────────────────────────────┘
    //  ┌───────────────────────────────────┐
    //  │  movimientos, inputs, colisiones  │
    //  └───────────────────────────────────┘

    //____________________PLAYER___________________________
    //

    //____________________PROYECTIL________________________
    //

    //______________________GRIDS__________________________
    //


    //  ┌───────────────────────────────────┐
    //  │             GameOver              │
    //  └───────────────────────────────────┘    


    if (gameOver) {
        cancelAnimationFrame(animationID)
        return
    }

    //  ┌───────────────────────────────────┐
    //  │             UPDATE                │
    //  └───────────────────────────────────┘    

    const deltaTime = time - lastTime
    lastTime = time

    update(deltaTime)
    draw()


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

