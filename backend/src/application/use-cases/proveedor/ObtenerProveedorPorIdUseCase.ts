import { IProveedorRepository } from '../../../domain/repositories/IProveedorRepository';
import { Proveedor } from '../../../domain/entities/Proveedor';

export class ObtenerProveedorPorIdUseCase {
    constructor(private proveedorRepository: IProveedorRepository) {}

    async execute(id: number): Promise<Proveedor | null> {
        return await this.proveedorRepository.obtenerPorId(id);
    }
}