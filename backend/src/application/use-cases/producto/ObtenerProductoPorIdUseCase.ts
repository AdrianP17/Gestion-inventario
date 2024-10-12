import { IProductoRepository } from '../../../domain/repositories/IProductoRepository';
import { Producto } from '../../../domain/entities/Producto';

export class ObtenerProductoPorIdUseCase {
    constructor(private productoRepository: IProductoRepository) {}

    async execute(id: number): Promise<Producto | null> {
        // TODO: Implementar la lógica para devolver el producto con el id correspondiente
        return await this.productoRepository.obtenerPorId(id);;
    }
}