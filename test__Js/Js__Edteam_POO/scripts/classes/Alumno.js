import Usuario from './Usuario.js'

export default class Alumno extends Usuario{
    constructor(nombre,apellido,correo,activo,foto,cursosTomados) {    
        super(nombre,apellido,correo,activo,foto)
        this.cursosTomados = cursosTomados
        
    }

    get CursosTomados() {
        return this.cursosTomados;
    }
}