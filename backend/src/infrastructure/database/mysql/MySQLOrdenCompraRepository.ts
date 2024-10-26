import { IOrdenCompraRepository } from "../../../domain/repositories/IOrdenCompraRepository";
import { OrdenCompra } from "../../../domain/entities/OrdenCompra";
import { db } from "./connection";

export class MySQLOrdenCompraRepository implements IOrdenCompraRepository {
    async obtenerTodas(): Promise<OrdenCompra[]> {
        try {
            const [results] = await db.query('SELECT * FROM orden_compra');
            return results as OrdenCompra[]
        } catch (error:any) {
            throw new Error('Error al obtener las ordenes de compra: ' + error.message);
        }
    }
    async obtenerPorId(id: number): Promise<OrdenCompra | null> {
        try {
            const [results] = await db.query('SELECT * FROM orden_compra WHERE id = ?', [id]);
            const productos = results as OrdenCompra[];
            return productos.length > 0 ? productos[0] : null;
        } catch (error: any) {
            throw new Error('Error al obtener la orden de compra por ID: ' + error.message);
        }
    }
    async crear(ordenCompra: OrdenCompra): Promise<number> {
        try {
            console.log(ordenCompra);
            const { proveedorID, fechaCompra, estado, TotalCompra } = ordenCompra;
            await db.execute(
                'INSERT INTO orden_compra (proveedorID, Fecha_Compra, estado, Total_Compra) VALUES (?, ?, ?, ?)',
                [proveedorID, fechaCompra, estado, TotalCompra]
            )

            const [results] = await db.query('SELECT LAST_INSERT_ID() as id');
            // const id = results[0].id;
            return 1
            
        } catch (error: any) {
            throw new Error('Error al crear el producto: ' + error.message);
        }
    }
    async actualizar(ordenCompra: OrdenCompra): Promise<void> {
        try {
            const { id, proveedorID, fechaCompra, estado, TotalCompra } = ordenCompra;
            await db.execute(
                'UPDATE orden_compra SET proveedorID = ?, Fecha_Compra = ?, estado = ?, Total_Compra = ? WHERE id = ?',
                [proveedorID, fechaCompra, estado, TotalCompra, id]
            );
        } catch (error: any) {
            throw new Error('Error al actualizar la orden de compra: ' + error.message);
        }
    }
    async eliminar(id: number): Promise<void> {
        try {
            await db.execute('DELETE FROM orden_compra WHERE id = ?', [id]);
        } catch (error: any) {
            throw new Error('Error al eliminar la orden de compra: ' + error.message);
        }
    }
}