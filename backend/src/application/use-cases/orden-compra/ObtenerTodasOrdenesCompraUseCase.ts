import { IOrdenCompraRepository } from '../../../domain/repositories/IOrdenCompraRepository';
import { OrdenCompra } from '../../../domain/entities/OrdenCompra';

export class ObtenerTodasOrdenesCompraUseCase {
    constructor(private ordenCompraRepository: IOrdenCompraRepository) {}

    async execute(): Promise<OrdenCompra[]> {
        return await this.ordenCompraRepository.obtenerTodas();
    }
}