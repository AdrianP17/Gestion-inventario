import { IKardexRepository } from "../../../domain/repositories/IKardexRepository";
import { Kardex } from "../../../domain/entities/Kardex";


export class MySQLKardexRepository implements IKardexRepository{

    async obtenerMovimientosPorProducto(productoId: number): Promise<Kardex[]> {
        //TODO
        return []
    }

    async registrarMovimiento(kardex: Kardex): Promise<void> {
        //TODO
    }

}