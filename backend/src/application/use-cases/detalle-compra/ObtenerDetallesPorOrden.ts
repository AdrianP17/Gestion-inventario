import { IDetalleCompraRepository } from '../../../domain/repositories/IDetalleCompraRepository';
import { DetalleCompra } from '../../../domain/entities/DetalleCompra';

export class ObtenerDetallesPorOrdenUseCase {
    constructor(private detalleCompraRepository: IDetalleCompraRepository) {}

    async execute(ordenCompraId: number): Promise<DetalleCompra[]> {
        // Implementar la lógica para devolver todos los detalles de compra asociados a la orden con el id correspondiente
        return await this.detalleCompraRepository.obtenerDetallesPorOrden(ordenCompraId);
    }
}