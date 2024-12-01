import { IProductoRepository } from "../../../domain/repositories/IProductoRepository";

export class ObtenerListaProductosUseCase {
    constructor(private productoRepository: IProductoRepository) {}
    execute(): Promise<{id: number, nombre: string, precio: number}[]> {
        return this.productoRepository.obtenerLista();
    }
}