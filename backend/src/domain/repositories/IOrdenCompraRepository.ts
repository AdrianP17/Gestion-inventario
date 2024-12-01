import { OrdenCompra } from "../entities/OrdenCompra";
import { DetalleCompra } from "../entities/DetalleCompra";
export interface IOrdenCompraRepository {
    obtenerTodas(): Promise<OrdenCompra[]>;
    obtenerPorId(id: number): Promise<any | null>;
    crear(data: { proveedorId: number; fechaCompra: Date; estado: string; detalles: DetalleCompra[] }): Promise<void>; // Devuelve el ID generado
    actualizar(data: { proveedorId: number; fechaCompra: Date; estado: string; totalCompra: number }): Promise<void>;
    eliminar(id: number): Promise<void>;
  }
  