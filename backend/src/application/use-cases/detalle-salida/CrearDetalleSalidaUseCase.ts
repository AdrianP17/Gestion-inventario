// backend/src/application/use-cases/detalle-salida/CrearDetalleSalidaUseCase.ts
import { IDetalleSalidaRepository } from '../../../domain/repositories/IDetalleSalidaRepository';
import { DetalleSalida } from '../../../domain/entities/DetalleSalida';

export class CrearDetalleSalidaUseCase {
  constructor(private detalleSalidaRepository: IDetalleSalidaRepository) {}

  async execute(data: {Salida_InventarioID: number; ProductoID: number; Cantidad: number; Precio_Unitario: number; Subtotal: number; Estado: string }): Promise<void> {
    await this.detalleSalidaRepository.crear(data);
  }
}