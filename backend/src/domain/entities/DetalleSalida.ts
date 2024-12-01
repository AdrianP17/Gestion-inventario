export class DetalleSalida {
    constructor(
      public productoId: number,
      public nombreProducto: string,
      public cantidad: number,
      public precioUnitario: number,
      public subtotal: number
    ) {}
  }
  