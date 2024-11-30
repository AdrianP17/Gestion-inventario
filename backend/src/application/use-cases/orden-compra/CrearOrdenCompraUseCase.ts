import { IOrdenCompraRepository } from '../../../domain/repositories/IOrdenCompraRepository';
import { OrdenCompra } from '../../../domain/entities/OrdenCompra';
import { DetalleCompra } from '../../../domain/entities/DetalleCompra';

export class CrearOrdenCompraUseCase {
  constructor(private ordenCompraRepository: IOrdenCompraRepository) {}

  async execute(data: { proveedorId: number; fechaCompra: Date; estado: string; detalles: DetalleCompra[] }): Promise<void> {
    // TODO: Implementar validaciones, por ejemplo, que el proveedor exista antes de crear la orden de compra
    await this.ordenCompraRepository.crear(data);
  }
}
