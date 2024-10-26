import { IProveedorRepository } from "../../../domain/repositories/IProveedorRepository";
import { Proveedor } from "../../../domain/entities/Proveedor";
import { db } from "./connection";

export class MySQLProveedorRepository implements IProveedorRepository {
    async obtenerTodos(): Promise<Proveedor[]> {
        throw new Error("Method not implemented.");
    }

    async obtenerPorId(id: number): Promise<Proveedor | null> {
        throw new Error("Method not implemented.");
    }

    async crear(proveedor: Proveedor): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async actualizar(proveedor: Proveedor): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async eliminar(id: number): Promise<void> {
        throw new Error("Method not implemented.");
    }
      
    async existeProveedorPorId(id: number): Promise<boolean> {
        const [results]: any = await db.query('SELECT 1 FROM proveedor WHERE id = ?', [id]);
        return results.length > 0;
    }
}