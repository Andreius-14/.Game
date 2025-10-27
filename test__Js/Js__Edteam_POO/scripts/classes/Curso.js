export default class Curso {
    constructor(nombre, poster, clases) {
        this.nombre = nombre;
        this.poster = poster;
        this.clases = clases;
        this.inscritos = []
    }

    get Nombre() {
        return this.nombre;
    }
    get Clases() {
        return this.clases;
    }
    get Poster() {
        return this.poster;
    }
    
    set Nombre(nombre) {
        this.nombre = nombre;
    }

    set Poster(poster) {
        this.nombre = poster;
    }

    set Clases(clases) {
        this.clases = this.clases;
    }

    incribir(alumno){
        this.inscritos.push(alumno)
    }
}