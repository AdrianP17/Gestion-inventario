import { IOrdenCompraRepository } from '../../../domain/repositories/IOrdenCompraRepository';
import { OrdenCompra } from '../../../domain/entities/OrdenCompra';

export class CrearOrdenCompraUseCase {
  constructor(private ordenCompraRepository: IOrdenCompraRepository) {}

  async execute(ordenCompra: OrdenCompra): Promise<void> {
    // TODO: Implementar validaciones, por ejemplo, que el proveedor exista antes de crear la orden de compra
    await this.ordenCompraRepository.crear(ordenCompra);
  }
}
