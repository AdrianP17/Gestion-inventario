import { Kardex } from "../entities/Kardex";
export interface IKardexRepository {
    obtenerMovimientosPorProducto(productoId: number): Promise<Kardex[]>;
    registrarMovimiento(kardex: Kardex): Promise<void>;
  }
  