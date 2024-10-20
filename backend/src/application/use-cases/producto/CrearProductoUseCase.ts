import { IProductoRepository } from '../../../domain/repositories/IProductoRepository';
import { Producto } from '../../../domain/entities/Producto';

export class CrearProductoUseCase {
    constructor(private productoRepository: IProductoRepository) {}

    async execute(producto: Producto): Promise<void> {
        
        await this.productoRepository.crear(producto);
    }
}
