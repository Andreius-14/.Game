import { makeCanvas, makeGrid } from "../JS-Shared/Shared-Canvas.js";
import { make, insertar } from "../JS-Shared/Shared-DOM.js";

import { grid, user, ghosts, width, height, cellSize } from "./const.js";

let gameOver = false;
let direccionActual;

let puntaje = 0;
const cellFruta = "🍒";
const colorFondo = "#000000";
const cellColorPared = "#1717b1";
const cellColorPunto = "white";

// ┌───────────────────────────────────┐
// │        Variables - Canvas         │
// └───────────────────────────────────┘
const canvas = makeCanvas(height, width, "canvas", true);
const ctx = canvas.getContext("2d");
ctx.scale(cellSize, cellSize);

const htmlPuntaje = make("h1", "", ["puntaje"]);
insertar(document.body, htmlPuntaje);
// ┌───────────────────────────────────┐
// │            Funciones              │
// └───────────────────────────────────┘
function draw() {
  // --> Draw_Bg
  ctx.fillStyle = colorFondo;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // --> Draw_Grid [Plano Cartesiano]
  grid.forEach((row, y) => {
    row.forEach((value, x) => {
      // Draw --> Pared
      if (value === 1) {
        ctx.fillStyle = cellColorPared;
        ctx.fillRect(x, y, 1, 1);
      }
      // Draw --> Bolitas
      if (value === 5) {
        ctx.fillStyle = cellColorPunto;
        ctx.beginPath();
        ctx.arc(x + 0.5, y + 0.5, 0.15, 0, Math.PI * 2);
        ctx.fill();
      }
      // Draw --> Fruta
      if (value === 7) {
        ctx.font = `${0.8}px sans-serif`; // Ajusta el tamaño de la fuente según necesites
        ctx.fillText(cellFruta, x, y + 0.8);
      }

      // Draw --> Dead
      if (value === 9) {
        ctx.font = `${0.8}px sans-serif`; // Ajusta el tamaño de la fuente según necesites
        ctx.fillText("💀", x, y + 0.8);
      }
    });
  });

  // --> Draw_Usuario [Plano Cartesiano]
  ctx.fillStyle = user.Color;
  ctx.fillRect(user.Position.x, user.Position.y, 1, 1);

  // --> Dras_Fantasma [Plano Cartesiano]
  ghosts.forEach((fantasma) => {
    ctx.fillStyle = fantasma.color;
    ctx.beginPath();
    ctx.arc(
      fantasma.Position.x + 0.5,
      fantasma.Position.y + 0.5,
      0.45,
      0,
      Math.PI * 2,
    );
    ctx.fill();
  });
}
// ┌───────────────────────────────────┐
// │    Funciones - Verificacion       │
// └───────────────────────────────────┘
function verifica_ColicionPared(character = user) {
  let [y, x] = [character.Position.y, character.Position.x];

  if (grid[y][x] === 1) return true;
}

function verifica_ColicionesItems(character = user) {
  let [y, x] = [character.Position.y, character.Position.x];

  if (grid[y][x] === 5 && character === user) puntaje += 10;

  if (grid[y][x] === 7 && character === user) puntaje += 1000;

  if (grid[y][x] === 9 && character === user) anuncioPerdiste();

  grid[y][x] = 0;
}

function verifica_ColicionConFantasma() {
  let [userx, usery] = [user.Position.x, user.Position.y];
  let respuesta = ghosts.some((fantasma) => {
    return fantasma.Position.x === userx && fantasma.Position.y === usery;
  });
  respuesta ? anuncioPerdiste() : "";
}
function verifica_HayBolasParaComer() {
  const hayBolitas = grid.some((row) => row.includes(5));
  hayBolitas ? "" : anuncioGanaste();
}

function anuncioPerdiste() {
  gameOver = true;
  alert("¡Game Over!");
  location.reload();
}
function anuncioGanaste() {
  gameOver = true;
  alert("🏆 ¡Ganaste!");
  location.reload();
}
// ┌───────────────────────────────────┐
// │              Fantasmas              │
// └───────────────────────────────────┘
function moverFantasmas() {
  ghosts.forEach((fantasma) => {
    const direcciones = [
      { x: 0, y: -1 }, // arriba
      { x: 0, y: 1 }, // abajo
      { x: -1, y: 0 }, // izquierda
      { x: 1, y: 0 }, // derecha
    ];

    const opcionesValidas = direcciones.filter((d) => {
      const nx = fantasma.Position.x + d.x;
      const ny = fantasma.Position.y + d.y;
      // Dentro del tablero y no es pared
      return grid[ny]?.[nx] !== undefined && grid[ny][nx] !== 1;
    });

    if (opcionesValidas.length > 0) {
      const aleatoria =
        opcionesValidas[Math.floor(Math.random() * opcionesValidas.length)];
      fantasma.Position.x += aleatoria.x;
      fantasma.Position.y += aleatoria.y;
    }
  });
}

// ┌───────────────────────────────────┐
// │              Trigger              │
// └───────────────────────────────────┘
document.addEventListener("keydown", (event) => {
  const key = event.key.toLowerCase();
  switch (key) {
    case "arrowup":
    case "w":
      direccionActual = moverArriba;
      break;

    case "arrowdown":
    case "s":
      direccionActual = moverAbajo;
      break;

    case "arrowleft":
    case "a":
      direccionActual = moverIzquierda;
      break;

    case "arrowright":
    case "d":
      direccionActual = moverDerecha;
      break;
  }
});

function moverArriba() {
  user.Position.y--;
  if (verifica_ColicionPared()) {
    user.Position.y++;
  }
}

function moverAbajo() {
  user.Position.y++;
  if (verifica_ColicionPared()) {
    user.Position.y--;
  }
}
function moverIzquierda() {
  user.Position.x--;
  if (verifica_ColicionPared()) {
    user.Position.x++;
  }
}
function moverDerecha() {
  user.Position.x++;
  if (verifica_ColicionPared()) {
    user.Position.x--;
  }
}

function update_puntaje() {
  htmlPuntaje.innerText = `Puntaje: ${puntaje}`;
}
// ┌───────────────────────────────────┐
// │               Main                │
// └───────────────────────────────────┘
let lastTime = 0;
let dropCounter = 0;

function update(time = 0) {
  const deltaTime = time - lastTime;
  lastTime = time;
  dropCounter += deltaTime;

  if (gameOver) return;

  update_puntaje();
  // Verificacion - Negativas
  verifica_ColicionConFantasma();
  verifica_ColicionesItems();
  verifica_HayBolasParaComer();
  if (dropCounter > 200) {
    dropCounter = 0;

    // Ejecuta por Segundo
    if (typeof direccionActual === "function") {
      direccionActual();
    }

    moverFantasmas();
  }

  draw();
  window.requestAnimationFrame(update);
}

update();
