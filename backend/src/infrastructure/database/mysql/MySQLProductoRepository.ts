import {IProductoRepository} from '../../../domain/repositories/IProductoRepository'
import {Producto} from '../../../domain/entities/Producto'

export class MySQLProductoRepository implements IProductoRepository {
    async obtenerTodos(): Promise<Producto[]> {
        //TODO
        return []
    }
    async obtenerPorId(id: number): Promise<Producto | null> {
        //  TODO
        return null
    }

    async crear(producto: Producto): Promise<void> {
        //TODO
    }

    async actualizar(producto: Producto): Promise<void> {
        //TODO
    }

    async eliminar(id: number): Promise<void> {
        //TODO
    }

    async obtenerPorCategoria(categoriaId: number): Promise<Producto[]> {
        //TODO
        return []
    }
}