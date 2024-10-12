import { ISalidaInventarioRepository } from '../../../domain/repositories/ISalidaInventarioRepository';
import { SalidaInventario } from '../../../domain/entities/SalidaInventario';

export class ObtenerTodasSalidasInventarioUseCase {
    constructor(private salidaInventarioRepository: ISalidaInventarioRepository) {}

    async execute(): Promise<SalidaInventario[]> {
        return await this.salidaInventarioRepository.obtenerTodas();
    }
}