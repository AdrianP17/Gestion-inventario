import { IProductoRepository } from '../../../domain/repositories/IProductoRepository';
import { Producto } from '../../../domain/entities/Producto';

export class CambiarEstadoProductoUseCase {
    constructor(private productoRepository: IProductoRepository) {}

    async execute(productoID: number, estado: string): Promise<void> {
        // TODO: Implementar lógica para cambiar el estado de un producto
        // await this.productoRepository.cambiarEstado(productoID, estado);
    }
}
