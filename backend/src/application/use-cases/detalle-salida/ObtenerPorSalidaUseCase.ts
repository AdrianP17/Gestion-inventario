// backend/src/application/use-cases/detalle-salida/ObtenerTodosDetallesSalidaUseCase.ts
import { IDetalleSalidaRepository } from '../../../domain/repositories/IDetalleSalidaRepository';
import { DetalleSalida } from '../../../domain/entities/DetalleSalida';

export class ObtenerPorSalidaUseCase {
  constructor(private detalleSalidaRepository: IDetalleSalidaRepository) {}

    async execute(Salida_InventarioID: number): Promise<DetalleSalida | null> {
        return await this.detalleSalidaRepository.obtenerPorSalida(Salida_InventarioID);
    }
}