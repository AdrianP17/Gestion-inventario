// backend/src/application/use-cases/detalle-salida/CrearDetalleSalidaUseCase.ts
import { IDetalleSalidaRepository } from '../../../domain/repositories/IDetalleSalidaRepository';
import { DetalleSalida } from '../../../domain/entities/DetalleSalida';

export class CrearDetalleSalidaUseCase {
  constructor(private detalleSalidaRepository: IDetalleSalidaRepository) {}

  async execute(detalleSalida: DetalleSalida): Promise<void> {
    await this.detalleSalidaRepository.agregarDetalle(detalleSalida);
  }
}