let turno;
let icon;
const cuadros = [];
const grid = [
  ["☐", "☐", "☐"],
  ["☐", "☐", "☐"],
  ["☐", "☐", "☐"],
];

// ┌───────────────────────────────────┐
// │           Funciones DOM           │
// └───────────────────────────────────┘

function make(tag, text = "", classes = []) {
  const element = document.createElement(tag);
  if (text) {
    element.textContent = text; // Usar textContent para texto plano
  }
  if (classes.length > 0) {
    element.classList.add(...classes);
  }
  return element;
}

function insertar(padre, hijo) {
  padre.appendChild(hijo);
}

// ┌───────────────────────────────────┐
// │              HTML                 │
// └───────────────────────────────────┘

const contenedorGrid = make("div", "", ["Contenedor"]);

grid.forEach((fila, x) => {
  fila.forEach((columna, y) => {
    const cuadro = make("div", "☐", ["cuadro"]);
    cuadros.push(cuadro); // Guardar referencia
    insertar(contenedorGrid, cuadro);
  });
});

insertar(document.body, contenedorGrid);
// ┌───────────────────────────────────┐
// │              Logica               │
// └───────────────────────────────────┘
function MensajeGanador(mensaje) {
  console.log(mensaje);
}

function asignarUsuario() {
  turno = turno === "user1" ? "user2" : "user1";
}
function asignarIcono() {
  icon = turno === "user1" ? "x" : "o";
}

function verificaGanador() {
  const lineasGanadoras = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // Filas
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // Columnas
    [0, 4, 8],
    [2, 4, 6], // Diagonales
  ];

  for (const linea of lineasGanadoras) {
    const [a, b, c] = linea;
    if (
      cuadros[a].textContent === icon &&
      cuadros[b].textContent === icon &&
      cuadros[c].textContent === icon
    ) {
      MensajeGanador(`Ganador ${icon} - ${turno}`);
      return true;
    }
  }
  return false;
}

function actualizarInformacionCuadros() {
  let index = 0;
  grid.forEach((fila) => {
    fila.forEach((columna) => {
      cuadros[index].innerText = columna; // Actualizar el texto
      index++;
    });
  });
}

// ┌───────────────────────────────────┐
// │              Evento               │
// └───────────────────────────────────┘
cuadros.forEach((cuadro, index) => {
  cuadro.addEventListener("click", () => {
    const x = Math.floor(index / 3); // Calcular fila
    const y = index % 3; // Calcular columna

    if (grid[x][y] === "☐") {
      // Solo permitir cambios en cuadros vacíos
      asignarUsuario();
      asignarIcono();
      grid[x][y] = icon; // Asignar icono según turno
      actualizarInformacionCuadros();
      verificaGanador();
    }
  });
});
