import { IDetalleSalidaRepository } from "../../../domain/repositories/IDetalleSalidaRepository";
import { db } from "./connection";
import { DetalleSalida } from "../../../domain/entities/DetalleSalida";

export class MySQLDetalleSalidaRepository implements IDetalleSalidaRepository {

  // Obtener los detalles de salida por el ID de la salida de inventario
  async obtenerPorSalida(Salida_InventarioID: number): Promise<DetalleSalida | null> {
    try {
      const [result]: any[] = await db.query(`
        SELECT 
          ID, 
          Salida_InventarioID, 
          ProductoID, 
          Cantidad, 
          Precio_Unitario, 
          Subtotal, 
          Estado
        FROM 
          detalle_salida
        WHERE 
          Salida_InventarioID = ?
      `, [Salida_InventarioID]);

      if (result.length === 0) {
        return null;
      }

      // Retornar el primer resultado encontrado, ya que esperamos un solo detalle por salida
      return result[0];
    } catch (error: any) {
      throw new Error('Error al obtener el detalle de salida: ' + error.message);
    }
  }

  // Crear un nuevo detalle de salida
  async crear(data: { 
    Salida_InventarioID: number; 
    ProductoID: number; 
    Cantidad: number; 
    Precio_Unitario: number; 
    Subtotal: number; 
    Estado: string; 
  }): Promise<void> {
    try {
      await db.query(`
        INSERT INTO detalle_salida 
          (Salida_InventarioID, ProductoID, Cantidad, Precio_Unitario, Subtotal, Estado)
        VALUES
          (?, ?, ?, ?, ?, ?)
      `, [data.Salida_InventarioID, data.ProductoID, data.Cantidad, data.Precio_Unitario, data.Subtotal, data.Estado]);
    } catch (error: any) {
      throw new Error('Error al crear el detalle de salida: ' + error.message);
    }
  }

  // Actualizar un detalle de salida
  async actualizar(data: { 
    Salida_InventarioID: number; 
    ProductoID: number; 
    Cantidad: number; 
    Precio_Unitario: number; 
    Subtotal: number; 
    Estado: string; 
  }): Promise<void> {
    try {
      await db.query(`
        UPDATE detalle_salida
        SET 
          ProductoID = ?, 
          Cantidad = ?, 
          Precio_Unitario = ?, 
          Subtotal = ?, 
          Estado = ?
        WHERE 
          Salida_InventarioID = ?
      `, [data.ProductoID, data.Cantidad, data.Precio_Unitario, data.Subtotal, data.Estado, data.Salida_InventarioID]);
    } catch (error: any) {
      throw new Error('Error al actualizar el detalle de salida: ' + error.message);
    }
  }

  // Eliminar los detalles de salida por el ID de la salida de inventario
  async eliminarPorSalida(Salida_InventarioID: number): Promise<void> {
    try {
      await db.query(`
        DELETE FROM detalle_salida
        WHERE Salida_InventarioID = ?
      `, [Salida_InventarioID]);
    } catch (error: any) {
      throw new Error('Error al eliminar el detalle de salida: ' + error.message);
    }
  }
}