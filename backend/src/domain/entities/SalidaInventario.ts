import { DetalleSalida } from "./DetalleSalida";
export class SalidaInventario {
    constructor(
      public ID: number,
      public Fecha_Registro: Date,
      public Motivo: string,
      public Area: string,
      public Estado: string,
      public Total_Salida: number,
      public Observaciones: string,
      public detallesSalida: DetalleSalida[],
    ) {}
  }
  