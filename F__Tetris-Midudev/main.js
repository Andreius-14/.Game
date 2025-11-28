// import "./style.css";
import {
  BLOCK_SIZE,
  PIECES,
  BOARD_WIDTH,
  BOARD_HEIGHT,
  EVENT_MOVEMENTS,
  board,
} from "./consts.js";

// ┌───────────────────────────────────┐
// │             CANVAS                │
// └───────────────────────────────────┘

// ┌──────
// │  => Html Etiqueta
// └──────

const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

// --> Establece el Tamaño de Canvas
canvas.width = BLOCK_SIZE * BOARD_WIDTH; //280
canvas.height = BLOCK_SIZE * BOARD_HEIGHT; //600

// --> Imagina una Lupa  (Cada Pixel aumenta por 20)
context.scale(BLOCK_SIZE, BLOCK_SIZE); //(20,20)

// ┌───────────────────────────────────┐
// │            Variables              │
// └───────────────────────────────────┘
const $score = document.querySelector("span");
const $section = document.querySelector("section");
const audio = new window.Audio("./tetris.mp3");

let score = 0;

// 8. auto drop
let dropCounter = 0;
let lastTime = 0;

// 4. pieza player
const piece = {
  positionIntoGrid: { x: 5, y: 5 },
  shape: [
    [1, 1],
    [1, 1],
  ],
};

// 3. board
// const board = createBoard(BOARD_WIDTH, BOARD_HEIGHT)

// ┌───────────────────────────────────┐
// │            Funciones              │
// └───────────────────────────────────┘

//function createBoard(width, height) {
//  return Array(height)
//    .fill()
//    .map(() => Array(width).fill(0));
//}

// 2. game loop
// function update () {
//   draw()
//   window.requestAnimationFrame(update)
// }

// ┌──────
// │  => Funciones - GRID BOARD
// └──────

//  comprendido

function draw() {
  // --> Draw_Bg
  context.fillStyle = "#335ca0";
  context.fillRect(0, 0, canvas.width, canvas.height); //[280,600]

  // --> Draw_Grid
  board.forEach((row, y) => {
    row.forEach((value, x) => {
      // [CODIGO]
      if (value === 1) {
        context.fillStyle = "yellow";
        context.fillRect(x, y, 1, 1);
      }
    });
  });

  // --> Draw_Bloque
  console.log("Figura");
  piece.shape.forEach((row, y) => {
    row.forEach((value, x) => {
      // [CODIGO]
      if (value) {
        context.fillStyle = "red";

        //Draw_Pixel-Into-Canvas
        context.fillRect(
          x + piece.positionIntoGrid.x,
          y + piece.positionIntoGrid.y,
          1,
          1,
        );
      }
    });
    //console.log(`FILA [${y}] --> (${row})`);
  });

  $score.innerText = score;

  // --> Recorreremos (row) (columns)
  // --> Representa Indices [Filas:x, Columnas:y]
  // --> 1 pixel por eso el scale()
}

// ┌──────
// │  => Funciones - PIECES
// └──────

//  comprendido - Simple

function resetPiece() {
  // --> Reset_Propiedades
  piece.positionIntoGrid.x = Math.floor(BOARD_WIDTH / 2 - 2);
  piece.positionIntoGrid.y = 0;
  piece.shape = PIECES[Math.floor(Math.random() * PIECES.length)];

  // --> End_gameover
  if (checkCollision()) {
    window.alert("Game over!! Sorry!");
    board.forEach((row) => {
      row.fill(0);
      console.log(row);
    });
    score = 0;
  }
}

//  comprendido - Simple

function checkCollision() {
  // (row) (columns)
  return piece.shape.find((row, y) => {
    return row.find((value, x) => {
      //(Run)
      return (
        value === 1 &&
        // --> Pieza: [[1][1][1]]   (0,0)   (0.1)   (0.2)  (Altura:fila:y ,columns:x )
        // --> Posicion Board:       5,5
        // --> Busqueda Sera:       [5][5]  [5][6]  [5][7]
        // --> board[fila][columns]
        board[y + piece.positionIntoGrid.y]?.[x + piece.positionIntoGrid.x] !==
          0
      );
    });
  });

  // --> Recorre la Pieza (Fila,Columna)
  // --> Al usar find (basta con que 1 sea True)
}

//  comprendido - Simple

function solidifyPiece() {
  // (row) (columns)
  piece.shape.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value === 1) {
        board[y + piece.positionIntoGrid.y][x + piece.positionIntoGrid.x] = 1;
      }
    });
  });

  resetPiece();

  // --> Recorre la Pieza (Fila,Columna)
  // --> Ubicacion en Grid + Piece Grid
  // --> Convierte en Solido
}

// ┌──────
// │  => Funciones - Limpiar
// └──────

//  comprendido - Simple

function removeRows() {
  const rowsToRemove = []; // Lista de fILAS LLENAS

  board.forEach((row, y) => {
    if (row.every((value) => value === 1)) {
      rowsToRemove.push(y);
    }
  });

  rowsToRemove.forEach((y) => {
    board.splice(y, 1); // siempre es 1
    const newRow = Array(BOARD_WIDTH).fill(0);
    board.unshift(newRow);
    score += 10;
  });

  //  --> Verifica Fila llena de 1
  //  --> Elimina Fila
  //  --> Añade nueva Fila
}

// ┌───────────────────────────────────┐
// │          Temporalizador           │
// └───────────────────────────────────┘
// ┌──────
// │  => 01 - Teclas Presionadas
// └──────
document.addEventListener("keydown", (event) => {
  if (event.key === EVENT_MOVEMENTS.LEFT) {
    piece.positionIntoGrid.x--;
    if (checkCollision()) {
      piece.positionIntoGrid.x++;
    }
  }

  if (event.key === EVENT_MOVEMENTS.RIGHT) {
    piece.positionIntoGrid.x++;
    if (checkCollision()) {
      piece.positionIntoGrid.x--;
    }
  }

  if (event.key === EVENT_MOVEMENTS.DOWN) {
    piece.positionIntoGrid.y++;
    if (checkCollision()) {
      piece.positionIntoGrid.y--;
      solidifyPiece();
      removeRows();
    }
  }

  if (event.key === "ArrowUp") {
    const rotated = [];

    // ESTO ES LO MÁS COMPLICADO DE LEJOS
    // --> 1 columna tiene muchas Filas
    // --> 1 Fila Tiene Varias Columnas
    //  [
    //    [0, 1],   (0,0) (0,1)
    //    [0, 1],   (1,0) (1,1)
    //    [1, 1],   (2,0) (2,1)
    //  ],

    // --> Pieza: [[1,1,1,1]]   (0,0)(0.1)(0.2)(0.3) (Altura:fila:y ,columns:x )

    // Selecciona una Columna
    for (let colum = 0; colum < piece.shape[0].length; colum++) {
      const row = [];
      // Selecciona All Filas
      for (let filas = piece.shape.length - 1; filas >= 0; filas--) {
        row.push(piece.shape[filas][colum]);
      }

      //console.log(row);
      // --> De Columna to Fila
      // --> Envia Fila a Variable Rotared
      rotated.push(row);
    }

    const previousShape = piece.shape;
    piece.shape = rotated;
    if (checkCollision()) {
      piece.shape = previousShape;
    }
  }
});

// ┌──────
// │  => Main - Incio
// └──────

// --> Inicializa Musica
// --> Limpia Pantalla de Bienvenida

$section.addEventListener("click", () => {
  update();

  $section.remove();
  audio.volume = 0.01;
  audio.play();
});

// --> Refresca Frame del Juego
// --> Ejecucion Constante

function update(time = 0) {
  const deltaTime = time - lastTime;
  lastTime = time;

  dropCounter += deltaTime;

  if (dropCounter > 1000) {
    piece.positionIntoGrid.y++;
    dropCounter = 0;

    if (checkCollision()) {
      piece.positionIntoGrid.y--;
      solidifyPiece();
      removeRows();
    }
  }

  draw();
  window.requestAnimationFrame(update);
}
