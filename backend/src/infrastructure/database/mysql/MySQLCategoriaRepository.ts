import { ICategoriaRepository } from "../../../domain/repositories/ICategoriaRepository";
import { Categoria } from "../../../domain/entities/Categoria";

export class MySQLProductoRepository implements ICategoriaRepository {
    async obtenerTodas(): Promise<Categoria[]> {
        //TODO
        return [];
    }
    async obtenerPorId(id: number): Promise<Categoria | null> {
        //TODO
        return null;
    }
    async crear(categoria: Categoria): Promise<void> {
        //TODO
    }
    async actualizar(categoria: Categoria): Promise<void> {
        //TODO
    }
    async eliminar(id: number): Promise<void> {
        //TODO
    }
}