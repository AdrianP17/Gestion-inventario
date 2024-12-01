import { IOrdenCompraRepository } from "../../../domain/repositories/IOrdenCompraRepository";
import { OrdenCompra } from "../../../domain/entities/OrdenCompra";

export class EliminarOrdenCompraUseCase {
    constructor(private ordenCompraRepository: IOrdenCompraRepository) {}
    
    
    async execute(id: number): Promise<void> {
        const orden = await this.ordenCompraRepository.obtenerPorId(id);
        if (!orden) {
            console.log('La orden de compra no existe');
            throw new Error('La orden de compra no existe');
        }
        return this.ordenCompraRepository.eliminar(id);
    }
}