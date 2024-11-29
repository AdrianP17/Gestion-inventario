import { SalidaInventario } from "../entities/SalidaInventario";
import { DetalleSalida } from "../entities/DetalleSalida";
export interface ISalidaInventarioRepository {
    obtenerTodas(): Promise<SalidaInventario[]>;
    obtenerPorId(id: number): Promise<SalidaInventario | null>;
    crear(data: { fechaRegistro: Date; area: string; estado: string; totalSalida: number, observaciones: string, detalles: DetalleSalida[] }): Promise<void>;
    actualizar(data: { fechaRegistro: Date; area: string; estado: string; totalSalida: number, observaciones: string }): Promise<void>;
    eliminar(id: number): Promise<void>;
  }
  