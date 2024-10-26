import { ISalidaInventarioRepository } from '../../../domain/repositories/ISalidaInventarioRepository';
import { SalidaInventario } from '../../../domain/entities/SalidaInventario';

export class ActualizarSalidaInventarioUseCase {
    constructor(private salidaInventarioRepository: ISalidaInventarioRepository) {}

    async execute(salidaInventario: SalidaInventario): Promise<void> {
        return await this.salidaInventarioRepository.actualizar(salidaInventario);
    }
}