import { IProductoRepository } from '../../../domain/repositories/IProductoRepository';

export class EliminarProductoUseCase {
    constructor(private productoRepository: IProductoRepository) {}

    async execute(id: number): Promise<void> {
        //TODO
        await this.productoRepository.eliminar(id);
    }
}