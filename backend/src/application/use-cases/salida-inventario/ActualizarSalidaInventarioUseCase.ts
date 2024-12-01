import { ISalidaInventarioRepository } from '../../../domain/repositories/ISalidaInventarioRepository';
import { SalidaInventario } from '../../../domain/entities/SalidaInventario';

export class ActualizarSalidaInventarioUseCase {
    constructor(private salidaInventarioRepository: ISalidaInventarioRepository) {}

    async execute(data: { fechaRegistro: Date; area: string; estado: string; totalSalida: number, observaciones: string }): Promise<void> {
        return await this.salidaInventarioRepository.actualizar(data);
    }
}