import { IProveedorRepository } from "../../../domain/repositories/IProveedorRepository";
import { Proveedor } from "../../../domain/entities/Proveedor";
import { db } from "./connection";

export class MySQLProveedorRepository implements IProveedorRepository {
    async obtenerTodos(): Promise<Proveedor[]> {
        try {
            const [results] = await db.query('SELECT id, nombre, contacto, telefono, email, direccion FROM Proveedor');
            return results as Proveedor[];
        } catch (error: any) {
            throw new Error('Error al obtener todos los proveedores: ' + error.message);
        }
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
        try {
            const [results] = await db.query('SELECT id, nombre, contacto, telefono, email, direccion FROM Proveedor WHERE id = ?', [id]);
            const proveedores = results as Proveedor[];
            return proveedores.length > 0 ? proveedores[0] : null;
        } catch (error: any) {
            throw new Error('Error al obtener el proveedor por ID: ' + error.message);
        }
    }

    async crear(proveedor: Proveedor): Promise<void> {
        try {
            console.log(proveedor);
            const { nombre, contacto, telefono, email, direccion } = proveedor;
            await db.execute(
                'INSERT INTO Proveedor (nombre, contacto, telefono, email, direccion) VALUES (?, ?, ?, ?, ?)',
                [nombre, contacto, telefono, email, direccion]
            );
        } catch (error: any) {
            throw new Error('Error al crear el proveedor: ' + error.message);
        }
    }

    async actualizar(proveedor: Proveedor): Promise<void> {
        try {
            const { id, nombre, contacto, telefono, email, direccion } = proveedor;
            console.log(proveedor);
            await db.execute(
                'UPDATE Proveedor SET nombre = ?, contacto = ?, telefono = ?, email = ?, direccion = ? WHERE id = ?',
                [nombre, contacto, telefono, email, direccion, id]
            );
        } catch (error: any) {
            throw new Error('Error al actualizar el proveedor: ' + error.message);
        }
    }

    async eliminar(id: number): Promise<void> {
      try {
        await db.execute('DELETE FROM Proveedor WHERE id = ?', [id]);
      } catch (error: any) {
        throw new Error('Error al eliminar el proveedor: ' + error.message);
      }
    }

    async existeProveedorPorId(id: number): Promise<boolean> {
        const [results]: any = await db.query('SELECT 1 FROM proveedor WHERE id = ?', [id]);
        return results.length > 0;
    }
}
