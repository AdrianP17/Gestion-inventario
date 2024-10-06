import { IOrdenCompraRepository } from "../../../domain/repositories/IOrdenCompra";
import { OrdenCompra } from "../../../domain/entities/OrdenCompra";

export class MySQLOrdenCompraRepository implements IOrdenCompraRepository {
    async obtenerTodas(): Promise<OrdenCompra[]> {
        throw new Error("Method not implemented.");
    }
    async obtenerPorId(id: number): Promise<OrdenCompra | null> {
        throw new Error("Method not implemented.");
    }
    async crear(ordenCompra: OrdenCompra): Promise<number> {
        throw new Error("Method not implemented.");
    }
    async actualizar(ordenCompra: OrdenCompra): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async eliminar(id: number): Promise<void> {
        throw new Error("Method not implemented.");
    }
}