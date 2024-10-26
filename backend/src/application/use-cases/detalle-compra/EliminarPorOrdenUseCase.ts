import { IDetalleCompraRepository } from '../../../domain/repositories/IDetalleCompraRepository';

export class EliminarPorOrdenUseCase {
    constructor(private detalleCompraRepository: IDetalleCompraRepository) {}

    async execute(ordenCompraId: number): Promise<void> {
        //TODO
        await this.detalleCompraRepository.eliminarPorOrden(ordenCompraId);
    }
}