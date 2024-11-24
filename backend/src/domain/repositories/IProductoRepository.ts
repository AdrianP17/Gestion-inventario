import { Producto } from "../entities/Producto";

export interface IProductoRepository {
    obtenerTodos(): Promise<Producto[]>;
    obtenerPorId(id: number): Promise<Producto | null>;
    crear(producto: Producto): Promise<void>;
    actualizar(producto: Producto): Promise<void>;
    eliminar(id: number): Promise<void>;
    obtenerPorCategoria(categoriaId: number): Promise<Producto[]>;
     // Métodos adicionales basados en los nuevos casos de uso
    actualizarStock(productoID: number, cantidad: number): Promise<void>; // Para ActualizarStockProductoUseCase
    cambiarEstado(productoID: number, estado: string): Promise<void>; // Para CambiarEstadoProductoUseCase
}