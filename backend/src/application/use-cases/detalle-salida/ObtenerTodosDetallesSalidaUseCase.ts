// backend/src/application/use-cases/detalle-salida/ObtenerTodosDetallesSalidaUseCase.ts
import { IDetalleSalidaRepository } from '../../../domain/repositories/IDetalleSalidaRepository';
import { DetalleSalida } from '../../../domain/entities/DetalleSalida';

export class ObtenerTodosDetallesSalidaUseCase {
  private detalleSalidaRepository: IDetalleSalidaRepository;

  constructor(detalleSalidaRepository: IDetalleSalidaRepository) {
    this.detalleSalidaRepository = detalleSalidaRepository;
  }

  async execute(): Promise<DetalleSalida[]> {
    return await this.detalleSalidaRepository.obtenerDetallesPorSalida();
  }
}