export default class Usuario {
    constructor(nombre, apellidos, correo, activo, foto) {
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.correo = correo;
        this.activo = activo;
        this.foto = foto;
    }

    get Nombre() {
        return this.nombre;
    }
    get Apellidos() {
        return this.apellidos;
    }
    get Correo() {
        return this.correo;
    }
    get Activo() {
        return this.activo;
    }
    get Foto() {
        return this.foto;
    }

    set Nombre(nuevoNombre) {
        this.nombre = nuevoNombre;
    }
    set Apellidos(nuevosApellidos) {
        this.nombre = nuevosApellidos;
    }

    // set Clases(clases) {
    //     this.clases = this.clases;
    // }
    presentarse(){
        return `Hola, Soy ${this.nombre} y mi correo es: ${this.correo}`;
    }
}