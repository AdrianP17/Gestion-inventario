import { IDetalleSalidaRepository } from "../../../domain/repositories/IDetalleSalidaRepository";
import { DetalleSalida } from "../../../domain/entities/DetalleSalida";

export class PostgreSQLDetalleSalidaRepository implements IDetalleSalidaRepository {
    async obtenerDetallesPorSalida(salidaId: number): Promise<DetalleSalida[]> {
        //TODO
        return [];
    }
    async agregarDetalle(detalleSalida: DetalleSalida): Promise<void> {
        //TODO
    }

    async eliminarPorSalida(salidaId: number): Promise<void> {
        //TODO
    }
}