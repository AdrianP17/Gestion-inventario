import { ISalidaInventarioRepository } from '../../../domain/repositories/ISalidaInventarioRepository';
import { SalidaInventario } from '../../../domain/entities/SalidaInventario';

export class EliminarSalidaInventarioUseCase {
    constructor(private salidaInventarioRepository: ISalidaInventarioRepository) {}

    async execute(id: number): Promise<void> {
        await this.salidaInventarioRepository.eliminar(id);
    }
}