export class Kardex {

    constructor(
        public id: number,
        public productoId: number,
        public fechaMovimiento: Date,
        public tipoMovimiento: 'Entrada' | 'Salida',
        public cantidad: number,
    ) {}
}