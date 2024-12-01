export class OrdenSalidaInventario {
    constructor(
      public ID: number,
      public Fecha_Registro: Date,
      public Motivo: string,
      public Area: string,
      public Estado: string,
      public Total_Salida: number,
      public Observaciones: Text,
    ) {}
  }
  