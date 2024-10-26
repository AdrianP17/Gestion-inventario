import { IDetalleCompraRepository } from '../../../domain/repositories/IDetalleCompraRepository';
import { DetalleCompra } from '../../../domain/entities/DetalleCompra';

export class AgregarDetalleUseCase {
    constructor(private detalleCompraRepository: IDetalleCompraRepository) {}

    async execute(detalleCompra: DetalleCompra): Promise<void> {
        
        await this.detalleCompraRepository.agregarDetalle(detalleCompra);
    }
}
