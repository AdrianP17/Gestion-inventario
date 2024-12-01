import { IRecepcionCompraRepository } from "../../../domain/repositories/IRecepcionCompraRepository";
import { RecepcionCompra } from "../../../domain/entities/RecepcionCompra";
import { db } from "./connection";

export class PostgreSQLRecepcionCompraRepository implements IRecepcionCompraRepository {
    async getAll(): Promise<RecepcionCompra[]> {
        try {
            const { rows } = await db.query('SELECT id, orden_compraid, fecha_recepcion, estado FROM recepcion_compra');
            console.log(rows);
            return rows as any[];
        } catch (error: any) {
            throw new Error('Error al obtener todas las recepciones: ' + error.message);
        }
    }
}
