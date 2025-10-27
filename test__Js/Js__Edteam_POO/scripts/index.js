// [Funciones]
import {insertaInputs } from './funciones.js'

// [Variables]
import { UsuarioSeleccionado, formularioCurso, formularioUsuarios } from './variables.js'

// [Clases]
import Curso from "./classes/Curso.js"
import Profesor from './classes/Profesor.js'
import Alumno from './classes/Alumno.js'

const elem = document.getElementById('cursos');

// [ Funcion de Insercion ]
function mostrarCurso (curso) { 
    const hijo = document.createElement("div");
    hijo.classList.add("card");

    hijo.innerHTML = `
    <div class="img-container s-ratio-16-9 s-radius-tr s-radius-tl">
        <img src="${curso.Poster}" alt="${curso.Nombre}"/>
    </div>

    <div class="card__data s-border s-radius-br s-radius-bl s-pxy-2">
        <h3 class="t5 s-mb-0 s-center">${curso.Nombre}</h3>
        
        <div class="s-center">
            <span class="small">Cantidad de Clase: ${curso.clases}</span> 
        </div>
    </div>
    `
    elem.appendChild(hijo)
}

function mostrarUsuario (usuario){
    const hijo = document.createElement("div");
    hijo.classList.add("card");

    hijo.innerHTML = `
    <div class="img-container s-ratio-16-9 s-radius-tr s-radius-tl ">
        <img src="${usuario.Foto}" alt="${usuario.Nombre}"/>
    </div>
    <div class="card__data s-border s-radius-br s-radius-bl s-pxy-2 ${UsuarioSeleccionado.value == "Profesor"?'l-bg-blue alt-banner__data':''} ">
        <h3 class="t5 s-mb-0 s-center">${usuario.Nombre}</h3>
        
        <div class="s-center">
            <span class="small">Apellido: ${usuario.Apellidos}</span> 
        </div>
        
        <div class="s-center">
            <span class="small">Correo: ${usuario.correo}</span> 
        </div>
        
        <div class="s-center">
            <span class="small">Activo: ${usuario.Activo}</span> 
        </div>
        ${UsuarioSeleccionado.value == "Profesor" 
            ?`  <div class="s-center">
                    <span class="small">Cursos Dictados: ${usuario.CursosDictados}</span> 
                </div>
                <div class="s-center">
                    <span class="small">Calificacion: ${usuario.Calificacion}</span> 
                </div>`
            :`  
                <div class="s-center">
                    <span class="small">Cursos Tomados: ${usuario.CursosTomados}</span> 
                </div>
            `

        }
    </div>
    `
    elem.appendChild(hijo)
    console.log("Mostrando Info"+ usuario);
}

// [Form - Enviado]

formularioCurso.addEventListener('submit', function (e) {
    e.preventDefault()
    // console.log(e.target); 
    const target = e.target;
    const curso = new Curso(target.nombreCurso.value,target.posterCurso.value,target.clasesCurso.value)
    mostrarCurso(curso)
    formularioCurso.reset()
});


// [Form - Enviado]

formularioUsuarios.addEventListener('submit', function (e) {
    e.preventDefault()
    console.log(e.target.fotoUsuario.value) ; 
    const target = e.target;

    const Usuario = UsuarioSeleccionado.value == "Profesor"
                    ? new Profesor(
                                    target.nombreUsuario.value,
                                    target.apellidoUsuario.value,
                                    target.correoUsuario.value , 
                                    target.activoUsuario.value ,
                                    target.fotoUsuario.value ,
                                    target.cursosDictadosProfesor.value,
                                    target.calificacionProfesor.value)
                    : new Alumno(
                                    target.nombreUsuario.value,
                                    target.apellidoUsuario.value,
                                    target.correoUsuario.value , 
                                    target.activoUsuario.value ,
                                    target.fotoUsuario.value ,
                                    target.cursosTomadosAlumno.value)
    mostrarUsuario(Usuario)
    console.log(Usuario.Apellidos,Usuario.Nombre,Usuario.Foto);
    // formularioCurso.reset()
});




window.addEventListener('load', insertaInputs);
UsuarioSeleccionado.addEventListener('change', insertaInputs);




