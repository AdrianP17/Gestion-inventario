import { IOrdenSalidaInventarioRepository } from '../../../domain/repositories/IOrdenSalidaInventarioRepository';
import { OrdenSalidaInventario } from '../../../domain/entities/OrdenSalidaInventario';

export class ObtenerOrdenSalidaInventarioPorIdUseCase {
    constructor(private ordenSalidaInventarioRepository: IOrdenSalidaInventarioRepository) {}

    async execute(ID: number): Promise<OrdenSalidaInventario | null> {
        return await this.ordenSalidaInventarioRepository.obtenerPorId(ID);
    }
}