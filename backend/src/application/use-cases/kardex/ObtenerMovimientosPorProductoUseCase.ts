import { IKardexRepository } from '../../../domain/repositories/IKardexRepository';
import { Kardex } from '../../../domain/entities/Kardex';

export class ObtenerMovimientosPorProductoUseCase {
    constructor(private kardexRepository: IKardexRepository) {}

    async execute(id: number): Promise<Kardex[]> {
        // TODO: Implementar la lógica para devolver los movimientos de un producto 
        return await this.kardexRepository.obtenerMovimientosPorProducto(id);
    }
}