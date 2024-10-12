import { IProveedorRepository } from '../../../domain/repositories/IProveedorRepository';
import { Proveedor } from '../../../domain/entities/Proveedor';

export class ActualizarProveedorUseCase {
    constructor(private proveedorRepository: IProveedorRepository) {}

    async execute(proveedor: Proveedor): Promise<void> {
        // TODO
        await this.proveedorRepository.actualizar(proveedor);
    }
}