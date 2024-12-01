export class DetalleSalida {
    constructor(
      public ID: number,
      public Salida_InventarioID: number,
      public ProductoID: number,
      public Cantidad: number,
      public Precio_Unitario: number,
      public Subtotal: number,
      public Estado: string
    ) {}
  }
  