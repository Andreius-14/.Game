/* eslint indent: "off" */
/* eslint-disable space-before-function-paren */

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

function collitionCanvas(obj) {
    const a = getBounds(obj)
    return (
        a.left <= 0 ||
        a.top <= 0 ||
        a.right >= canvas.width ||
        a.bottom >= canvas.height
    )
}

function willCollide({ x = 0, y = 0, user = player, bound = boundaries }) {
    const future = { x: user.position.x + x, y: user.position.y + y }
    const main = { ...user, position: future }
    return bound.some(boundary => collitionObjetos(main, boundary))
}
//SAlio de Pacman
function anulaGiroAnteColision({ x = 0, y = 0 }) {
    for (const boundary of boundaries) {

        // Prevee una situacion Futura
        if (collitionObjetos(
            { ...player, velocity: { x, y } },
            boundary)
        ) {
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

// Buena practiva que al emular sea el personaje el que se mueva
//

// ╭───────────────────────────────────────────────────────────╮
// │                El Deltatime en Javascript                 │
// ╰───────────────────────────────────────────────────────────╯
let lastTime = 0

function animate(currentTime) {
    if (!lastTime) lastTime = currentTime
    const deltaTime = currentTime - lastTime  // En milisegundos
    lastTime = currentTime

    // ... resto del bucle
    window.requestAnimationFrame(animate)
}


