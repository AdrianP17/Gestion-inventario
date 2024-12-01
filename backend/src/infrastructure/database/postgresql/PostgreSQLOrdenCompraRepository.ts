import { IOrdenCompraRepository } from "../../../domain/repositories/IOrdenCompraRepository";
import { OrdenCompra } from "../../../domain/entities/OrdenCompra";
import { db } from "./connection";
import { DetalleCompra } from "../../../domain/entities/DetalleCompra";

export class PostgreSQLOrdenCompraRepository implements IOrdenCompraRepository {
    async obtenerTodas(): Promise<OrdenCompra[]> {
        try {
            const { rows } = await db.query(`
                SELECT Orden_Compra.ID, Proveedor.Nombre AS NombreProveedor, Orden_Compra.Fecha_Compra, 
                   Orden_Compra.Estado, Orden_Compra.Total_Compra
                FROM Orden_Compra
                JOIN Proveedor ON Orden_Compra.ProveedorID = Proveedor.ID
                ORDER BY Orden_Compra.Fecha_Compra DESC
            `);
            return rows;
        } catch (error: any) {
            throw new Error('Error al obtener las órdenes de compra: ' + error.message);
        }
    }

    async obtenerPorId(id: number): Promise<OrdenCompra | null> {
        try {
            const { rows: ordenes } = await db.query(`
                SELECT 
                    Orden_Compra.ID,
                    Orden_Compra.Fecha_Compra,
                    Orden_Compra.Estado,
                    Orden_Compra.Total_Compra,
                    Proveedor.Nombre AS NombreProveedor,
                    Orden_Compra.ProveedorID
                FROM Orden_Compra
                JOIN Proveedor ON Orden_Compra.ProveedorID = Proveedor.ID
                WHERE Orden_Compra.ID = $1
            `, [id]);

            if (ordenes.length === 0) {
                return null;
            }

            const { rows: detalles } = await db.query(`
                SELECT 
                    Detalle_Compra.ProductoID,
                    Producto.Nombre AS NombreProducto,
                    Detalle_Compra.Cantidad,
                    Detalle_Compra.Precio_Unitario,
                    Detalle_Compra.Subtotal
                FROM Detalle_Compra
                JOIN Producto ON Detalle_Compra.ProductoID = Producto.ID
                WHERE Detalle_Compra.Orden_CompraID = $1
            `, [id]);

            return {
                ...ordenes[0],
                detalles,
            };
        } catch (error: any) {
            throw new Error('Error al obtener la orden de compra por ID: ' + error.message);
        }
    }

    async crear(data: { proveedorId: number; fechaCompra: Date; estado: string; detalles: DetalleCompra[] }): Promise<void> {
        const client = await db.connect();
        try {
            await client.query('BEGIN');

            // Insertar la orden de compra
            const { rows } = await client.query(`
                INSERT INTO orden_compra (ProveedorID, Fecha_Compra, Estado, Total_Compra)
                VALUES ($1, $2, $3, $4)
                RETURNING ID
            `, [data.proveedorId, data.fechaCompra, data.estado, 0]);

            const ordenCompraId = rows[0].id;

            // Insertar los detalles de la orden de compra
            let totalCompra = 0;
            for (const detalle of data.detalles) {
                const subtotal = detalle.cantidad * detalle.precioUnitario;
                totalCompra += subtotal;

                await client.query(`
                    INSERT INTO detalle_compra (Orden_CompraID, ProductoID, Cantidad, Precio_Unitario, Subtotal)
                    VALUES ($1, $2, $3, $4, $5)
                `, [ordenCompraId, detalle.productoId, detalle.cantidad, detalle.precioUnitario, subtotal]);
            }

            // Actualizar el total de la orden de compra
            await client.query(`
                UPDATE orden_compra
                SET Total_Compra = $1
                WHERE ID = $2
            `, [totalCompra, ordenCompraId]);

            await client.query('COMMIT');
        } catch (error: any) {
            await client.query('ROLLBACK');
            throw new Error('Error al crear la orden de compra y detalles: ' + error.message);
        } finally {
            client.release();
        }
    }

    async actualizar(data: { id: number; proveedorId: number; fechaCompra: Date; estado: string; totalCompra: number }): Promise<void> {
        try {
            const { id, proveedorId, fechaCompra, estado, totalCompra } = data;
            await db.query(
                'UPDATE orden_compra SET ProveedorID = $1, Fecha_Compra = $2, Estado = $3, Total_Compra = $4 WHERE ID = $5',
                [proveedorId, fechaCompra, estado, totalCompra, id]
            );
        } catch (error: any) {
            throw new Error('Error al actualizar la orden de compra: ' + error.message);
        }
    }

    async eliminar(id: number): Promise<void> {
        try {
            await db.query('DELETE FROM orden_compra WHERE ID = $1', [id]);
        } catch (error: any) {
            throw new Error('Error al eliminar la orden de compra: ' + error.message);
        }
    }
}
