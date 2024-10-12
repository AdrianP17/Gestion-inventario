import { IOrdenCompraRepository } from '../../../domain/repositories/IOrdenCompraRepository';
import { OrdenCompra } from '../../../domain/entities/OrdenCompra';

export class ObtenerOrdenCompraPorIdUseCase {
    constructor(private ordenCompraRepository: IOrdenCompraRepository) {}

    async execute(id: number): Promise<OrdenCompra | null> {
        return await this.ordenCompraRepository.obtenerPorId(id);
    }
}