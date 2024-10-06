import { SalidaInventario } from "../entities/SalidaInventario";
export interface ISalidaInventarioRepository {
    obtenerTodas(): Promise<SalidaInventario[]>;
    obtenerPorId(id: number): Promise<SalidaInventario | null>;
    crear(salidaInventario: SalidaInventario): Promise<number>; // Devuelve el ID generado
    actualizar(salidaInventario: SalidaInventario): Promise<void>;
    eliminar(id: number): Promise<void>;
  }
  