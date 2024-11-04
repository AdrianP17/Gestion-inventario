import { IOrdenCompraRepository } from "../../../domain/repositories/IOrdenCompraRepository";
import { IProveedorRepository } from "../../../domain/repositories/IProveedorRepository";
import { OrdenCompra } from "../../../domain/entities/OrdenCompra";

export class ActualizarOrdenCompraUseCase {
    constructor(private ordenCompraRepository: IOrdenCompraRepository, private proveedorRepository: IProveedorRepository) {}

    async execute(data: { id: number; proveedorId: number; fechaCompra: Date; estado: string; totalCompra: number }): Promise<void> {
        // TODO: Implementar validaciones, por ejemplo, que el proveedor exista antes de actualizar la orden de compra

        // Verificar si la orden de compra existe
        const ordenExiste = await this.ordenCompraRepository.obtenerPorId(data.id);
        if (!ordenExiste) {
            throw new Error('La orden de compra no existe.');
        }
        // Verificar si el proveedor existe
        const proveedorExiste = await this.proveedorRepository.existeProveedorPorId(data.proveedorId);
        if (!proveedorExiste) {
            throw new Error('El proveedor no existe.');
        }
        
        return this.ordenCompraRepository.actualizar(data);
    }
}