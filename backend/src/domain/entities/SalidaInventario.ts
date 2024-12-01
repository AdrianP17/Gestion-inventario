import { DetalleSalida } from "./DetalleSalida";
export class SalidaInventario {
  constructor(
    public id: number,
    public fechaRegistro: Date,
    public motivo?: string,
    public area?: string,
    public estado?: string,
    public totalSalida?: number,
    public observaciones?: string,
    public detallesSalida?: DetalleSalida[]
  ) {}
}