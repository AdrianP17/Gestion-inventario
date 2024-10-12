import { IProveedorRepository } from '../../../domain/repositories/IProveedorRepository';
import { Proveedor } from '../../../domain/entities/Proveedor';

export class ObtenerTodosProveedoresUseCase {
    constructor(private proveedorRepository: IProveedorRepository) {}

    async execute(): Promise<Proveedor[]> {
        return await this.proveedorRepository.obtenerTodos();
    }
}