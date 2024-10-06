import { DetalleSalida } from "../entities/DetalleSalida";
export interface IDetalleSalidaRepository {
    obtenerDetallesPorSalida(salidaInventarioId: number): Promise<DetalleSalida[]>;
    agregarDetalle(detalleSalida: DetalleSalida): Promise<void>;
    eliminarPorSalida(salidaInventarioId: number): Promise<void>;
  }
  