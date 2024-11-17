import { IOrdenCompraRepository } from "../../../domain/repositories/IOrdenCompraRepository";
import { OrdenCompra } from "../../../domain/entities/OrdenCompra";
import { db } from "./connection";

export class MySQLOrdenCompraRepository implements IOrdenCompraRepository {
    async obtenerTodas(): Promise<OrdenCompra[]> {
        try {
            const [results] :any = await db.query(`
                SELECT Orden_Compra.ID, Proveedor.Nombre AS NombreProveedor, Orden_Compra.Fecha_Compra, 
                   Orden_Compra.Estado, Orden_Compra.Total_Compra
            FROM Orden_Compra
            JOIN Proveedor ON Orden_Compra.ProveedorID = Proveedor.ID
            ORDER BY Orden_Compra.Fecha_Compra DESC`);

            return results;
        } catch (error:any) {
            throw new Error('Error al obtener las ordenes de compra: ' + error.message);
        }
    }
    async obtenerPorId(id: number): Promise<OrdenCompra | null> {
        try {
            const [ordenes] : any[] = await db.query(`
                SELECT 
                Orden_Compra.ID,
                Orden_Compra.Fecha_Compra,
                Orden_Compra.Estado,
                Orden_Compra.Total_Compra,
                Proveedor.Nombre AS NombreProveedor,
                Orden_Compra.ProveedorID
            FROM Orden_Compra
            JOIN Proveedor ON Orden_Compra.ProveedorID = Proveedor.ID
            WHERE Orden_Compra.ID = ?
        `, [id]);

        if (ordenes.length === 0) {
            return null;
        }
        const [detalles] = await db.query(`
            SELECT 
                Detalle_Compra.ProductoID,
                Producto.Nombre AS NombreProducto,
                Detalle_Compra.Cantidad,
                Detalle_Compra.Precio_Unitario,
                Detalle_Compra.Subtotal
            FROM Detalle_Compra
            JOIN Producto ON Detalle_Compra.ProductoID = Producto.ID
            WHERE Detalle_Compra.Orden_CompraID = ?
        `, [id]);
            
        return {
            ...ordenes[0],
            detalles,
        };
        } catch (error: any) {
            throw new Error('Error al obtener la orden de compra por ID: ' + error.message);
        }
    }
    async crear(data: { proveedorId: number; fechaCompra: Date; estado: string; totalCompra: number }): Promise<void> {
        try {
            console.log(data);
            const { proveedorId, fechaCompra, estado, totalCompra } = data;
            await db.execute(
                'INSERT INTO orden_compra (proveedorID, Fecha_Compra, estado, Total_Compra) VALUES (?, ?, ?, ?)',
                [proveedorId, fechaCompra, estado, totalCompra]
            )
            
        } catch (error: any) {
            throw new Error('Error al crear el producto: ' + error.message);
        }
    }
    async actualizar(data: { id: number; proveedorId: number; fechaCompra: Date; estado: string; totalCompra: number }): Promise<void> {
        try {
            const { id, proveedorId, fechaCompra, estado, totalCompra } = data;
            await db.execute(
                'UPDATE orden_compra SET proveedorID = ?, Fecha_Compra = ?, estado = ?, Total_Compra = ? WHERE id = ?',
                [proveedorId, fechaCompra, estado, totalCompra, id]
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