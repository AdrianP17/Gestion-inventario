import { IDetalleSalidaRepository } from '../../../domain/repositories/IDetalleSalidaRepository';
import { DetalleSalida } from '../../../domain/entities/DetalleSalida';

export class ActualizarDetalleSalidaUseCase {
  constructor(private detalleSalidaRepository: IDetalleSalidaRepository) {}

  async execute(data: {Salida_InventarioID: number; ProductoID: number; Cantidad: number; Precio_Unitario: number; Subtotal: number; Estado: string }): Promise<void> {
    await this.detalleSalidaRepository.actualizar(data);
  }
}