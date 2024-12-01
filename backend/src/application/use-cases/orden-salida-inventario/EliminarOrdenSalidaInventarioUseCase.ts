import { IOrdenSalidaInventarioRepository } from '../../../domain/repositories/IOrdenSalidaInventarioRepository';
import { OrdenSalidaInventario } from '../../../domain/entities/OrdenSalidaInventario';

export class EliminarOrdenSalidaInventarioUseCase {
    constructor(private ordenSalidaInventarioRepository: IOrdenSalidaInventarioRepository) {}

    async execute(id: number): Promise<void> {
        await this.ordenSalidaInventarioRepository.eliminar(id);
    }
}