export class Kardex {

    constructor(
        public id: number,
        public fechaMovimiento: Date,
        public tipoMovimiento: 'Entrada' | 'Salida',
        public ordenCompraId?: number,
        public salidaInventarioId?: number
    ) {}
}