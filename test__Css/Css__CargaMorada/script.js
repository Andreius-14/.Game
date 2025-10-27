const padres = document.querySelectorAll('.contenedor')

padres.forEach((padre) =>{
for (let index = 1; index <= 25; index++) {
  //[■ Crea Hijo y Clase]
  const individuo = document.createElement("span");
  individuo.classList.add("hijo")
  individuo.style = `animation-delay: ${index*0.08}s`

  //[■ Hijo inserta a Padre]
  padre.appendChild(individuo)
  
}
})

/*
  🌲 El codigo esta Hecho para que cualquier caja con clase .contenedor Tenga el Efecto
*/
