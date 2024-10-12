import { ISalidaInventarioRepository } from '../../../domain/repositories/ISalidaInventarioRepository';
import { SalidaInventario } from '../../../domain/entities/SalidaInventario';

export class ObtenerSalidaInventarioPorIdUseCase {
    constructor(private salidaInventarioRepository: ISalidaInventarioRepository) {}

    async execute(id: number): Promise<SalidaInventario | null> {
        return await this.salidaInventarioRepository.obtenerPorId(id);
    }
}