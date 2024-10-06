import { IDetalleCompraRepository } from "../../../domain/repositories/IDetalleCompraRepository";
import { DetalleCompra } from "../../../domain/entities/DetalleCompra";

export class MySQLDetalleCompraRepository implements IDetalleCompraRepository {
    async obtenerDetallesPorOrden(ordenCompraId: number): Promise<DetalleCompra[]> {
        //TODO
        return [];
    }

    async agregarDetalle(detalleCompra: DetalleCompra): Promise<void> {
        //TODO
    }

    async eliminarPorOrden(ordenCompraId: number): Promise<void> {
        //TODO
    }
}