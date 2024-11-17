import { OrdenCompra } from "../entities/OrdenCompra";
export interface IOrdenCompraRepository {
    obtenerTodas(): Promise<OrdenCompra[]>;
    obtenerPorId(id: number): Promise<any | null>;
    crear(data: { proveedorId: number; fechaCompra: Date; estado: string; totalCompra: number }): Promise<void>; // Devuelve el ID generado
    actualizar(data: { proveedorId: number; fechaCompra: Date; estado: string; totalCompra: number }): Promise<void>;
    eliminar(id: number): Promise<void>;
  }
  