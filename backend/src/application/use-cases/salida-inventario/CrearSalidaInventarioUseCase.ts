import { ISalidaInventarioRepository } from '../../../domain/repositories/ISalidaInventarioRepository';
import { SalidaInventario } from '../../../domain/entities/SalidaInventario';

export class CrearSalidaInventarioUseCase {
  constructor(private salidaInventarioRepository: ISalidaInventarioRepository) {}

  async execute(salida: SalidaInventario): Promise<void> {
    // TODO: Verificar si hay suficiente stock antes de permitir la salida
    await this.salidaInventarioRepository.crear(salida);
  }
}
