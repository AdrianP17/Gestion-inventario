import { ISalidaInventarioRepository } from "../../../domain/repositories/ISalidaInventarioRepository";
import { db } from "./connection";
import { SalidaInventario } from "../../../domain/entities/SalidaInventario";
import { DetalleSalida } from "../../../domain/entities/DetalleSalida";

export class PostgreSQLSalidaInventarioRepository implements ISalidaInventarioRepository {
    async obtenerTodas(): Promise<SalidaInventario[]> {
        try {
            const { rows } = await db.query('SELECT * FROM orden_salida_inventario');
            return rows;
        } catch (error: any) {
            throw new Error(error.message); 
        }
    }

    async obtenerPorId(id: number): Promise<SalidaInventario | null> {
        try {
            const query = `
                SELECT 
                    osi.ID,
                    osi.Fecha_Registro,
                    osi.Motivo,
                    osi.Area,
                    osi.Estado,
                    osi.Total_Salida,
                    osi.Observaciones
                FROM 
                    orden_salida_inventario osi
                WHERE 
                    osi.ID = $1
            `;
            const { rows } = await db.query(query, [id]);
            if (rows.length === 0) {
                return null;
            }
            const salidaInventario: SalidaInventario = rows[0];
            const detallesSalida = await this.obtenerDetallesPorSalida(salidaInventario.ID);
            return new SalidaInventario(
                salidaInventario.ID,
                salidaInventario.Fecha_Registro,
                salidaInventario.Motivo,
                salidaInventario.Area,
                salidaInventario.Estado,
                salidaInventario.Total_Salida,
                salidaInventario.Observaciones,
                detallesSalida 
            );
        } catch (error: any) {
            throw new Error(error.message); 
        }
    }

    async obtenerDetallesPorSalida(salidaId: number): Promise<DetalleSalida[]> {
        try {
            const query = `
                SELECT 
                    ds.ProductoID AS productoId,
                    p.Nombre AS nombreProducto,
                    ds.Cantidad,
                    ds.Precio_Unitario AS precioUnitario,
                    ds.Subtotal
                FROM 
                    detalle_salida ds
                    INNER JOIN producto p ON ds.ProductoID = p.ID
                WHERE 
                    ds.Salida_InventarioID = $1
            `;
            const { rows } = await db.query(query, [salidaId]);
            return rows;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async crear(data: { fechaRegistro: Date; area: string; estado: string; totalSalida: number; observaciones: string; detalles: DetalleSalida[] }): Promise<void> {
        try {
            const query = `
                INSERT INTO 
                    orden_salida_inventario (Fecha_Registro, Motivo, Area, Estado, Total_Salida, Observaciones)
                VALUES ($1, $2, $3, $4, $5, $6)
            `;
            const { rows } = await db.query(query, [
                data.fechaRegistro,
                '', // Motivo is not defined in the data interface
                data.area,
                data.estado,
                data.totalSalida,
                data.observaciones
            ]);
            const salidaId = rows[0].id;
            await Promise.all(data.detalles.map((detalleSalida) => this.crearDetalleSalida(detalleSalida, salidaId)));
        } catch (error: any) {
            throw new Error(error.message); 
        }
    }

    async crearDetalleSalida(detalleSalida: DetalleSalida, salidaId: number): Promise<void> {
        try {
            const query = `
                INSERT INTO 
                    detalle_salida (Salida_InventarioID, ProductoID, Cantidad, Precio_Unitario, Subtotal)
                VALUES ($1, $2, $3, $4, $5)
            `;
            await db.query(query, [
                salidaId,
                detalleSalida.productoId,
                detalleSalida.cantidad,
                detalleSalida.precioUnitario,
                detalleSalida.subtotal
            ]);
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async actualizar(): Promise<void> {
        try {
            // Implementar lógica de actualización si es necesario
        } catch (error: any) {
            throw new Error(error.message); 
        }
    }

    async eliminar(id: number): Promise<void> {
        try {
            // Implementar lógica de eliminación si es necesario
        } catch (error: any) {
            throw new Error(error.message); 
        }
    }
}
