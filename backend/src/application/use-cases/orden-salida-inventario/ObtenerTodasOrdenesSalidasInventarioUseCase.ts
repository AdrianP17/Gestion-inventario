import { IOrdenSalidaInventarioRepository } from '../../../domain/repositories/IOrdenSalidaInventarioRepository';
import { OrdenSalidaInventario } from '../../../domain/entities/OrdenSalidaInventario';

export class ObtenerTodasOrdenesSalidasInventarioUseCase {
    constructor(private ordenSalidaInventarioRepository: IOrdenSalidaInventarioRepository) {}

    async execute(): Promise<OrdenSalidaInventario[]> {
        return await this.ordenSalidaInventarioRepository.obtenerTodas();
    }
}