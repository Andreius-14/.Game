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
//                      CLASS
// ______________________________________________________
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
        // c.fillStyle = 'red'
        // c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    update() {
        if (this.image) {
            this.draw()
            this.position.x += this.velocity.x
        }
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
    //  ┌───────────────────────────────────┐
    //  │              Bucle                │
    //  └───────────────────────────────────┘    
    //     
    requestAnimationFrame(animate)

    //  ┌───────────────────────────────────┐
    //  │          Limpiar Canvas           │
    //  └───────────────────────────────────┘    

    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)

    //  ┌───────────────────────────────────┐
    //  │            Movimiento             │
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

    //  ┌───────────────────────────────────┐
    //  │             UPDATE                │
    //  └───────────────────────────────────┘    

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
