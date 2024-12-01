<<<<<<< Updated upstream:backend/src/domain/entities/SalidaInventario.ts
export class SalidaInventario {
    constructor(
      public id: number,
      public fechaSalida: Date,
      public area: string,
      public estado: string,
      public totalSalida: number
=======
export class OrdenSalidaInventario {
    constructor(
      public ID: number,
      public Fecha_Registro: Date,
      public Motivo: string,
      public Area: string,
      public Estado: string,
      public Total_Salida: number,
      public Observaciones: Text,
>>>>>>> Stashed changes:backend/src/domain/entities/OrdenSalidaInventario.ts
    ) {}
  }
  