/* eslint indent: "off" */
/* eslint-disable space-before-function-paren */

// ______________________________________________________
//
//                      CONST
// ______________________________________________________
//
//
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
class Player {
    constructor() {
        this.velocity = { x: 0, y: 0 }
        const url = './Shaders/spaceship.png'
        const image = new Image()
        image.src = url
        image.onload = () => {

            const scale = 0.15

            this.width = image.width * scale
            this.height = image.height * scale
            this.image = image

            this.position = {
                x: canvas.width / 2 - this.width / 2,
                y: canvas.height - this.height - 20
            }
        }

    }

    draw() {
        if (this.image) {
            c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height)
        }
        // c.fillStyle = 'red'
        // c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}

const player = new Player()

//
// ______________________________________________________
//
//                       FUNCTION
// ______________________________________________________
//
//
// ______________________________________________________
//
//                    INSTANCIA
// ______________________________________________________
//
// Recorre map
//
// ______________________________________________________
//
//                      BUCLE
// ______________________________________________________
//
function animate() {
    requestAnimationFrame(animate)


    player.draw()
}


animate()
// ______________________________________________________
//
//                      EVENT
// ______________________________________________________
//
//
