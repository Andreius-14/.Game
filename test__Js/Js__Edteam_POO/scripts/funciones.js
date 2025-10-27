import {Padre_formUsuario,Hermano_botonUser,UsuarioSeleccionado} from './variables.js'

function inputTipo(contenedor , clasesDelContenedor, Descripcion, tipodeInput,nameInput,propiedadesExtra =""){
    let caja = document.createElement(`${contenedor}`);
    caja.classList.add("form-item",`${clasesDelContenedor}`)
    caja.innerHTML = ` <label > ${Descripcion} : <input type="${tipodeInput}" name="${nameInput}" ${propiedadesExtra} > </label> `;
    return caja
}

export {inputTipo};


function insertaInputs() {

    //Nodos Eliminar
    const Nodos_limpiar = document.querySelectorAll('.Alumno, .Profesor');
    Nodos_limpiar.forEach(function(elemento) {
        elemento.remove();
    });

    //Nodos Insertar
    let seleccion = UsuarioSeleccionado.value;
    if (seleccion == 'Profesor') {
        let cursosDictados = inputTipo("div","Profesor","Cursos Dictados","text","cursosDictadosProfesor")
        let calificacion = inputTipo("div","Profesor","calificacion","Number","calificacionProfesor",'min="1" max="20" value="5"')
        Padre_formUsuario.insertBefore(cursosDictados,Hermano_botonUser);
        Padre_formUsuario.insertBefore(calificacion,Hermano_botonUser);
    }
    if (seleccion == 'Alumno') {
        let cursosTomados = inputTipo("div","Alumno","Cursos Tomados","text","cursosTomadosAlumno")
        Padre_formUsuario.insertBefore(cursosTomados,Hermano_botonUser); 
    }
}
export {insertaInputs}