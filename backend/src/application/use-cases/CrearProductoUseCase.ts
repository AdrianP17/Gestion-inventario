import { IProductoRepository } from '../../domain/repositories/IProductoRepository';
import { Producto } from '../../domain/entities/Producto';

export class CrearProductoUseCase {
    constructor(private productoRepository: IProductoRepository) {}

    async execute(producto: Producto): Promise<void> {
        // Aquí podrías añadir lógica de negocio antes de crear el producto
        await this.productoRepository.crear(producto);
    }
}
