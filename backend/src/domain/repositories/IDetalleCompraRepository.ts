import { DetalleCompra } from '../entities/DetalleCompra';
export interface IDetalleCompraRepository {
    obtenerDetallesPorOrden(ordenCompraId: number): Promise<DetalleCompra[]>;
    agregarDetalle(detalleCompra: DetalleCompra): Promise<void>;
    eliminarPorOrden(ordenCompraId: number): Promise<void>;
  }
  