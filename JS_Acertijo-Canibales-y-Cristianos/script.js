const personajes = document.querySelectorAll(".canibal , .sacerdote");
const contenedorBarco = document.querySelector(".contenedor");
const ladoIzquierdo = document.querySelector(".lado.inicio");
const ladoDerecho = document.querySelector(".lado.fin");
const button = document.querySelector(".button");
const root = document.documentElement;
const padre = document.querySelector(".padre");

const segundos = 5000;

// [ 🌱🌱🌱 Evento Boton Click ]
button.addEventListener("click", () => {
  // if - Minimo un tripulante
  if (contenedorBarco.children.length > 1) {
    // Envia a la otra Orilla
    contenedorBarco.classList.toggle("orillaFinal");
    // Desabilita Boton
    button.disabled = true;
    // Activa Funcion de LLegada
    setTimeout(() => llegadaAOrillas(), segundos);
  }
});

// [ 🌱🌱🌱 Funciones ]
function llegadaAOrillas() {
  button.disabled = false;
  console.log("Llego");
  desenbarco();
  verificaLados();
}

function desenbarco() {
  let valores = obtenerContenidoObjeto(contenedorBarco);
  valores.shift();
  contenedorBarco.classList.contains("orillaFinal")
    ? valores.forEach((valor) => ladoDerecho.appendChild(valor))
    : valores.forEach((valor) => ladoIzquierdo.appendChild(valor));
}

function verificaLados() {
  console.log("Verifica Riesgo de Muerte");
  muerte(obtenerContenidoObjeto(ladoIzquierdo));
  muerte(obtenerContenidoObjeto(ladoDerecho));
  ganamos();
}

function obtenerContenidoObjeto(caja) {
  let hijosList = Array.from(caja.children);
  return hijosList;
}

// [ 🌱🌱🌱 Funciones ]
function muerte(valorArray) {
  let titulos = valorArray.map((valor) => { return valor.getAttribute("title"); });
  let nCanival = titulos.filter((valor) => valor === "canibal").length;
  let nSacerdote = titulos.filter((valor) => valor === "sacerdote").length;
  if (nCanival > nSacerdote && nSacerdote > 0) {
    anuncioPersonalizado("img/final.jpg","Murio",5000);
  }
}

function ganamos(){
  let contador = obtenerContenidoObjeto(ladoDerecho);
  if (contador.length == 7) {
    anuncioPersonalizado("img/ganaste.png","Ganador",5000);
  }
}
// [ 🌱🌱🌱 Eventos Personajes Insercion ]

personajes.forEach((data) => {
  data.addEventListener("click", (e) => {
    console.log(e.target);
    insertarEnVote(e.target);
  });
});

function insertarEnVote(html) {
  if (contenedorBarco.children.length < 3) {
    contenedorBarco.appendChild(html);
  }
}

/*[💀💀 Anuncio]*/
function anuncioPersonalizado(nameImagen,nameTitle,duracionDeAnuncio) {
      setTimeout(() => {

      const anuncio = document.createElement("div");
      anuncio.setAttribute("class", "anuncio");
      anuncio.innerHTML = `<img src=${nameImagen} title=${nameTitle} />`;
      document.body.insertBefore(anuncio, padre);

      console.log("DEAD DEAD");
      
      //Actualizar Pantalla
      setTimeout(() => {
        location.reload();
      }, duracionDeAnuncio);

    }, 2000);
}
