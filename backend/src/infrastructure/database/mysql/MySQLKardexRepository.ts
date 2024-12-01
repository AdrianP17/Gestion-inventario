import { IKardexRepository } from "../../../domain/repositories/IKardexRepository";
import { Kardex } from "../../../domain/entities/Kardex";
import { db } from "./connection";

export class MySQLKardexRepository implements IKardexRepository{

    async obtenerMovimientos(): Promise<Kardex[]> {
        try {
            const [results] = await db.query('SELECT id, fecha_movimiento, tipo_movimiento, orden_compraid, salida_inventarioid FROM Kardex');
            return results as Kardex[];
        } catch (error: any) {
            throw new Error('Error al obtener los movimientos de Kardex: ' + error.message);
        }
    }

    async registrarMovimiento(kardex: Kardex): Promise<void> {
        //TODO
    }

}