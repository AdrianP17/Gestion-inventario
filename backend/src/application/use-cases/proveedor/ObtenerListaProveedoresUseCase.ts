import { IProveedorRepository } from "../../../domain/repositories/IProveedorRepository";
import { Proveedor } from "../../../domain/entities/Proveedor";

export class ObtenerListaProveedorUseCase {
    constructor(private proveedorRepository: IProveedorRepository) {}

    async execute(): Promise<{ id: number; nombre: string }[]> {
        return await this.proveedorRepository.obtenerListaProveedores();
    }
}