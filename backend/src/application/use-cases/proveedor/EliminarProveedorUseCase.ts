import { IProveedorRepository } from '../../../domain/repositories/IProveedorRepository';
import { Proveedor } from '../../../domain/entities/Proveedor';

export class EliminarProveedorUseCase {

    constructor(private proveedorRepository: IProveedorRepository) {}

    async execute(id: number): Promise<void> {

        await this.proveedorRepository.eliminar(id);
    }

}