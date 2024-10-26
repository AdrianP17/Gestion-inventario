import { IOrdenCompraRepository } from "../../../domain/repositories/IOrdenCompraRepository";
import { IProveedorRepository } from "../../../domain/repositories/IProveedorRepository";
import { OrdenCompra } from "../../../domain/entities/OrdenCompra";

export class ActualizarOrdenCompraUseCase {
    constructor(private ordenCompraRepository: IOrdenCompraRepository, private proveedorRepository: IProveedorRepository) {}

    async execute(ordenCompra: OrdenCompra): Promise<void> {
        // TODO: Implementar validaciones, por ejemplo, que el proveedor exista antes de actualizar la orden de compra

        // Verificar si la orden de compra existe
        const ordenExiste = await this.ordenCompraRepository.obtenerPorId(ordenCompra.id);
        if (!ordenExiste) {
            throw new Error('La orden de compra no existe.');
        }
        // Verificar si el proveedor existe
        const proveedorExiste = await this.proveedorRepository.existeProveedorPorId(ordenCompra.proveedorID);
        if (!proveedorExiste) {
            throw new Error('El proveedor no existe.');
        }
        
        return this.ordenCompraRepository.actualizar(ordenCompra);
    }
}