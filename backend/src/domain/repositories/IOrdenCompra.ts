import { OrdenCompra } from "../entities/OrdenCompra";
export interface IOrdenCompraRepository {
    obtenerTodas(): Promise<OrdenCompra[]>;
    obtenerPorId(id: number): Promise<OrdenCompra | null>;
    crear(ordenCompra: OrdenCompra): Promise<number>; // Devuelve el ID generado
    actualizar(ordenCompra: OrdenCompra): Promise<void>;
    eliminar(id: number): Promise<void>;
  }
  