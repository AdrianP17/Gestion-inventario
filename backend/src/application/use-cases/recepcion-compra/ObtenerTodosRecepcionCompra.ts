import { RecepcionCompra } from "../../../domain/entities/RecepcionCompra";
import { IRecepcionCompraRepository } from "../../../domain/repositories/IRecepcionCompraRepository";
export class ObtenerTodosRecepcionCompraUseCase {
    constructor(private recepcionCompraRepository: IRecepcionCompraRepository) {}

    async execute(): Promise<any[]> {
        const recepcionesCompra = await this.recepcionCompraRepository.getAll();
        // 
        return recepcionesCompra;
    }
}