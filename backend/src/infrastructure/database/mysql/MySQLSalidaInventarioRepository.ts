import { ISalidaInventarioRepository } from "../../../domain/repositories/ISalidaInventarioRepository";
import { SalidaInventario } from "../../../domain/entities/SalidaInventario";

export class MySQLSalidaInventarioRepository implements ISalidaInventarioRepository {
    async obtenerTodas(): Promise<SalidaInventario[]> {
        throw new Error("Method not implemented.");
    }
    async obtenerPorId(id: number): Promise<SalidaInventario | null> {
        throw new Error("Method not implemented.");
    }
    async crear(salidaInventario: SalidaInventario): Promise<number> {
        throw new Error("Method not implemented.");
    }
    async actualizar(salidaInventario: SalidaInventario): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async eliminar(id: number): Promise<void> {
        throw new Error("Method not implemented.");
    }
}