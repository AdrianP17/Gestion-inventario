import { Proveedor } from "../entities/Proveedor";
export interface IProveedorRepository {
    obtenerTodos(): Promise<Proveedor[]>;
    obtenerListaProveedores(): Promise<{id: number, nombre: string}[]>
    obtenerPorId(id: number): Promise<Proveedor | null>;
    crear(proveedor: Proveedor): Promise<void>;
    actualizar(proveedor: Proveedor): Promise<void>;
    eliminar(id: number): Promise<void>;
    existeProveedorPorId(id: number): Promise<boolean>;
  }
  