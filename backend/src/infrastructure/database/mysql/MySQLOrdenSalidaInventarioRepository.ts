import { IOrdenSalidaInventarioRepository } from "../../../domain/repositories/IOrdenSalidaInventarioRepository";
import { db } from "./connection";
import { OrdenSalidaInventario } from "../../../domain/entities/OrdenSalidaInventario";

export class MySQLOrdenSalidaInventarioRepository implements IOrdenSalidaInventarioRepository {

  // Obtener todas las órdenes de salida de inventario
  async obtenerTodas(): Promise<OrdenSalidaInventario[]> {
    try {
      const [results]: any = await db.query('SELECT * FROM orden_salida_inventario');
      return results;
    } catch (error: any) {
      throw new Error(error.message); 
    }
  }

  // Obtener una orden de salida de inventario por su ID
  async obtenerPorId(id: number): Promise<OrdenSalidaInventario | null> {
    try {
      const [result]: any[] = await db.query(
        `SELECT 
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
          osi.ID = ?`, [id]);

      if (result.length === 0) {
        return null;
      }

      return result[0]; // Devuelve el primer resultado, ya que la consulta debería devolver solo un elemento.
    } catch (error: any) {
      throw new Error(error.message); 
    }
  }

  // Crear una nueva orden de salida de inventario
  async crear(data: {Fecha_Registro: Date; Motivo: string; Area: string; Estado: string; Total_Salida: number; Observaciones: Text}): Promise<void> {
    try {
      const query = `
        INSERT INTO orden_salida_inventario (Fecha_Registro, Motivo, Area, Estado, Total_Salida, Observaciones)
        VALUES (?, ?, ?, ?, ?, ?)
      `;
      await db.query(query, [data.Fecha_Registro, data.Motivo, data.Area, data.Estado, data.Total_Salida, data.Observaciones]);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  // Actualizar una orden de salida de inventario
  async actualizar(data: {ID: number; Fecha_Registro: Date; Motivo: string; Area: string; Estado: string; Total_Salida: number; Observaciones: Text}): Promise<void> {
    try {
      const query = `
        UPDATE orden_salida_inventario
        SET Fecha_Registro = ?, Motivo = ?, Area = ?, Estado = ?, Total_Salida = ?, Observaciones = ?
        WHERE ID = ?
      `;
      await db.query(query, [data.ID, data.Fecha_Registro, data.Motivo, data.Area, data.Estado, data.Total_Salida, data.Observaciones]);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  // Eliminar una orden de salida de inventario
  async eliminar(ID: number): Promise<void> {
    try {
      const query = `DELETE FROM orden_salida_inventario WHERE ID = ?`;
      await db.query(query, [ID]);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
