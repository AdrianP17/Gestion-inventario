export class RecepcionCompra {
    constructor(
      public id: number,
      public ordenCompraId: number,
      public fechaRecepcion: Date,
      public estado: 'Completa' | 'Parcial' | 'Pendiente'
    ) {}
}