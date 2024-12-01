import { IRecepcionCompraRepository } from "../../../domain/repositories/IRecepcionCompraRepository";
import { RecepcionCompra } from "../../../domain/entities/RecepcionCompra";
import { db } from "./connection";

export class MySQLRecepcionCompraRepository implements IRecepcionCompraRepository {
    async getAll(): Promise<RecepcionCompra[]> {
        try {
            const [results] = await db.query('SELECT id, orden_compraid, fecha_recepcion, estado FROM Recepcion_Compra');
            console.log(results);
            return results as any[];
        } catch (error : any) {
            throw new Error('Error al obtener todos las recepciones: ' + error.message);
        }
    }
}