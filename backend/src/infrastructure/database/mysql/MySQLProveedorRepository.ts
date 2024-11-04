import { IProveedorRepository } from "../../../domain/repositories/IProveedorRepository";
import { Proveedor } from "../../../domain/entities/Proveedor";
import { db } from "./connection";

export class MySQLProveedorRepository implements IProveedorRepository {
    async obtenerTodos(): Promise<Proveedor[]> {
        throw new Error("Method not implemented.");
    }

    async obtenerListaProveedores(): Promise<{ id: number; nombre: string; }[]> {
        try {
            const [proveedores] = await db.query(`
                SELECT 
                    ID AS id,
                    Nombre AS nombre
                FROM 
                    Proveedor;
            `);
            return proveedores as { id: number; nombre: string; }[];
        } catch (error : any) {
            throw new Error('Error al obtener la lista de proveedores: ' + error.message);
        }
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