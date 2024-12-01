import { Kardex } from "../entities/Kardex";
export interface IKardexRepository {
    registrarMovimiento(kardex: Kardex): Promise<void>;
    obtenerMovimientos(): Promise<Kardex[]>
  }
  