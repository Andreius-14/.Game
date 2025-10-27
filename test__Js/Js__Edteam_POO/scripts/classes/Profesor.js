import Usuario from './Usuario.js'

export default class Profesor extends Usuario{
constructor(nombre,apellido,correo,activo,foto,cd,calificacion) {    
    super(nombre,apellido,correo,activo,foto)
    this.cursosDictados = cd
    this.calificacion = calificacion
    
}
get CursosDictados() {
    return this.cursosDictados;
}
get Calificacion() {
    return this.calificacion;
}
}
