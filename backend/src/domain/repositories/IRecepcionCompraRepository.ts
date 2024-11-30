import { RecepcionCompra } from "../entities/RecepcionCompra";

export interface IRecepcionCompraRepository {
    getAll(): Promise<any[]>;
}