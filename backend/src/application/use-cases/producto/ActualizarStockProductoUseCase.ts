import { IProductoRepository } from '../../../domain/repositories/IProductoRepository';
import { Producto } from '../../../domain/entities/Producto';

export class ActualizarStockProductoUseCase {
    constructor(private productoRepository: IProductoRepository) {}

    async execute(productoID: number, cantidad: number): Promise<void> {
        // TODO: Implementar lógica para actualizar el stock del producto
        // await this.productoRepository.actualizarStock(productoID, cantidad);
    }
}
