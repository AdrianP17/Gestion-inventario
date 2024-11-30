import { ISalidaInventarioRepository } from '../../../domain/repositories/ISalidaInventarioRepository';
import { DetalleSalida } from '../../../domain/entities/DetalleSalida';
import { SalidaInventario } from '../../../domain/entities/SalidaInventario';

export class CrearSalidaInventarioUseCase {
  constructor(private salidaInventarioRepository: ISalidaInventarioRepository) {}

  async execute(data: { fechaRegistro: Date; area: string; estado: string; totalSalida: number, observaciones: string, detalles: DetalleSalida[] }): Promise<void> {
    // TODO: Verificar si hay suficiente stock antes de permitir la salida
    await this.salidaInventarioRepository.crear(data);
  }
}
