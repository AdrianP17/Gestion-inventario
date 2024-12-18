import { ISalidaInventarioRepository } from "../../../domain/repositories/ISalidaInventarioRepository";
import { db } from "./connection";
import { SalidaInventario } from "../../../domain/entities/SalidaInventario";
import { DetalleSalida } from "../../../domain/entities/DetalleSalida";


export class MySQLSalidaInventarioRepository implements ISalidaInventarioRepository {
    async obtenerTodas(): Promise<SalidaInventario[]> {
        try {
            const [results] :any = await db.query('SELECT id, fecha_registro, motivo, area, estado, total_salida, observaciones FROM orden_salida_inventario;');
            return results;
        } catch (error: any) {
            throw new Error(error.message); 
        }
    }
    async obtenerPorId(id: number): Promise<SalidaInventario | null> {
        try {
            const query = `
        SELECT 
          osi.id,
          osi.fecha_registro,
          osi.motivo,
          osi.area,
          osi.estado,
          osi.total_salida,
          osi.observaciones
        FROM 
          orden_salida_inventario osi
        WHERE 
          osi.id = ?;
      `;
      const [result] : any[] = await db.query(query, [id]);
      if (result.length === 0) {
        return null;
      }
      const salidaInventario : SalidaInventario = result[0];
    
      const [ detallesSalida ] : any = await db.query(`
        SELECT 
           ds.productoid,
            p.Nombre AS nombreproducto,
            ds.cantidad,
            ds.precio_unitario AS preciounitario,
            ds.subtotal
        FROM 
            detalle_salida ds
            JOIN producto p ON ds.productoid = p.ID
        WHERE 
            ds.Salida_InventarioID = ?;
    `, [id]);
    // const detallesSalida = await this.obtenerDetallesPorSalida(salidaInventario.ID);
        
      return {
        ...salidaInventario,
        detallesSalida}
        } catch (error: any) {
            throw new Error(error.message); 
        }
        return null;
    }

    async obtenerDetallesPorSalida(salidaId: number): Promise<DetalleSalida[]> {
        try {
          const query = `
            SELECT 
              ds.productoid,
              p.nombre AS nombreproducto,
              ds.cantidad,
              ds.Precio_Unitario AS preciounitario,
              ds.subtotal
            FROM 
              detalle_salida ds
              INNER JOIN producto p ON ds.ProductoID = p.ID
            WHERE 
              ds.Salida_InventarioID = ?
          `;
          const [result] : any[] = await db.query(query, [salidaId]);
          return result;
        } catch (error : any) {
          throw new Error(error.message);
        }
      }

    async crear(data: { fechaRegistro: Date; area: string; estado: string; totalSalida: number; observaciones: string; detalles: DetalleSalida[] }): Promise<void> {
        try {
            const query = `
        INSERT INTO 
          orden_salida_inventario (Fecha_Registro, Motivo, Area, Estado, Total_Salida, Observaciones)
        VALUES (?, ?, ?, ?, ?, ?)
      `;
      const [result] : any = await db.query(query, [
        data.fechaRegistro,
        '', // Motivo is not defined in the data interface
        data.area,
        data.estado,
        data.totalSalida,
        data.observaciones
      ]);
      const salidaId = result.insertId;
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
            VALUES (?, ?, ?, ?, ?)
          `;
          await db.query(query, [
            salidaId,
            detalleSalida.productoId,
            detalleSalida.cantidad,
            detalleSalida.precioUnitario,
            detalleSalida.subtotal
          ]);
        } catch (error : any) {
          throw new Error(error.message);
        }
      }
    async actualizar(): Promise<void> {
        try {
            
        } catch (error: any) {
            throw new Error(error.message); 
        }
    }
    async eliminar(id: number): Promise<void> {
        try {
            
        } catch (error: any) {
            throw new Error(error.message); 
        }
    }
}