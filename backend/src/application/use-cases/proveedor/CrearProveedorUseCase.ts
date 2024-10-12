import { IProveedorRepository } from '../../../domain/repositories/IProveedorRepository';
import { Proveedor } from '../../../domain/entities/Proveedor';

export class CrearProveedorUseCase {
  constructor(private proveedorRepository: IProveedorRepository) {}

  async execute(proveedor: Proveedor): Promise<void> {
    // TODO: Agregar lógica de validación para el proveedor antes de crearlo
    await this.proveedorRepository.crear(proveedor);
  }
}
