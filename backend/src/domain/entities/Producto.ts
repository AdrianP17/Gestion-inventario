export class Producto {
    constructor(
        public id: number,
        public nombre: string,
        public categoriaId: number,
        public precio: number,
        public descripcion: string,
        public marca: string,
        public modelo: string,
        public nivelMaximo: number,
        public nivelMinimo: number
    ) {}
}