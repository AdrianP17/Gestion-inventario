import { IProductoRepository } from '../../../domain/repositories/IProductoRepository';
import { Producto } from '../../../domain/entities/Producto';

export class ObtenerProductosMaximosUseCase {
  constructor(private productoRepository: IProductoRepository) {}

  async execute(): Promise<Producto[]> {
    // TODO: Agregar la lógica si es necesario filtrar o manipular productos antes de devolverlos
    return await this.productoRepository.obtenerProductosArribaDelNivelMaximo();
  }
}
