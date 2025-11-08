import { makeCanvas } from './Shared-js/core/shared-Canvas.js'
import { _insertar } from './Shared-js/core/shared-Dom.js'

const canvas = makeCanvas({ width: innerWidth, height: innerHeight })
const c = canvas.getContext('2d')

_insertar(document.body, canvas)

class Boundary {
  static width = 40
  static heigh = 40
  constructor ({ position }) {
    this.position = position
    this.width = 40
    this.height = 40
  }

  draw () {
    c.fillStyle = 'blue'
    c.fillRect(this.position.x, this.position.y, this.width, this.height)
  }
}

const map = [
  ['-', '-', '-', '-', '-', '-', '-'],
  ['-', ' ', '-', '-', '-', ' ', '-'],
  ['-', ' ', ' ', ' ', '-', ' ', '-'],
  ['-', ' ', '-', ' ', ' ', ' ', '-'],
  ['-', ' ', '-', '-', '-', ' ', '-'],
  ['-', '-', '-', '-', '-', '-', '-']
]

const boundaries = []

// Map: Recorre - Dibuja
map.forEach((row, i) => {
  row.forEach((symbol, j) => {
    // Dibuja segun Contenido
    switch (symbol) {
      case '-':
        boundaries.push(new Boundary({
          position: {
            x: Boundary.width * j,
            y: Boundary.heigh * i
          }

        }))
        break
    }
  })
})

boundaries.forEach((boundaries) => {
  boundaries.draw()
})
