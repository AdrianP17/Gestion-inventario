import { IProductoRepository } from '../../../domain/repositories/IProductoRepository';
import { Producto } from '../../../domain/entities/Producto';

export class ActualizarProductoUseCase {
    constructor(private productoRepository: IProductoRepository) {}

    async execute(producto: Producto): Promise<void> {
        // TODO: Implementar la lógica para validar y actualizar el producto
        await this.productoRepository.actualizar(producto);
    }
}