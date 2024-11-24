import {Request, Response} from 'express'
import { CrearProductoUseCase } from '../../application/use-cases/producto/CrearProductoUseCase'
import { ObtenerTodosProductosUseCase } from '../../application/use-cases/producto/ObtenerTodosProductosUseCase'
import { ActualizarProductoUseCase } from '../../application/use-cases/producto/ActualizarProductoUseCase'
import { EliminarProductoUseCase } from '../../application/use-cases/producto/EliminarProductoUseCase'
import { ObtenerProductoPorIdUseCase } from '../../application/use-cases/producto/ObtenerProductoPorIdUseCase'
import { ActualizarStockProductoUseCase } from '../../application/use-cases/producto/ActualizarStockProductoUseCase';
import { CambiarEstadoProductoUseCase } from '../../application/use-cases/producto/CambiarEstadoProductoUseCase';

export class ProductoController {

    constructor(
        private crearProductoUseCase: CrearProductoUseCase,
        private obtenerTodosProductosUseCase: ObtenerTodosProductosUseCase,
        private obtenerProductoPorIdUseCase: ObtenerProductoPorIdUseCase,
        private actualizarProductoUseCase: ActualizarProductoUseCase,
        private eliminarProductoUseCase: EliminarProductoUseCase,
        // Agregar los nuevos casos de uso
        private actualizarStockProductoUseCase: ActualizarStockProductoUseCase,
        private cambiarEstadoProductoUseCase: CambiarEstadoProductoUseCase
    ) {}

    async crear(req: Request, res: Response): Promise<void> {
        const { nombre, categoriaId, precio, descripcion, marca, modelo, nivelMaximo, nivelMinimo, stockActual, sku, estado } = req.body;
        try {
            await this.crearProductoUseCase.execute({
                id: 0,
                nombre,
                categoriaId,
                precio,
                descripcion,
                marca,
                modelo,
                nivelMaximo,
                nivelMinimo,
                stockActual,
                sku,
                estado
            });
            res.status(201).json({ message: 'Producto creado con éxito' });
        } catch (error: any) {
            res.status(500).json({ message: 'Error al crear el producto: ' + error.message });
        }
    }
    async obtenerTodosProductos(req: Request, res: Response): Promise<void> {
        try {
            const productos = await this.obtenerTodosProductosUseCase.execute();
            res.json(productos);
        } catch (error: any) {
            res.status(500).json({ message: 'Error al obtener los productos: ' + error.message });
        }
    }

    async obtenerPorId(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const producto = await this.obtenerProductoPorIdUseCase.execute(parseInt(id));
            res.json(producto);
        } catch (error: any) {
            res.status(500).json({ message: 'Error al obtener el producto por ID: ' + error.message });
        }
    }

    async actualizar(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        //Verificar que el producto exista
        const producto = await this.obtenerProductoPorIdUseCase.execute(parseInt(id));
        if (!producto) {
            res.status(404).json({ message: 'Producto no encontrado' });
            return;
        }

        const { nombre, categoriaId, precio, descripcion, marca, modelo, nivelMaximo, nivelMinimo, stockActual, sku, estado } = req.body;
        try {
            await this.actualizarProductoUseCase.execute({
                id: parseInt(id),
                nombre,
                categoriaId,
                precio,
                descripcion,
                marca,
                modelo,
                nivelMaximo,
                nivelMinimo,
                stockActual,
                sku,
                estado
            });
            res.status(200).json({ message: 'Producto actualizado con exito' });
        } catch (error: any) {
            res.status(500).json({ message: 'Error al actualizar el producto: ' + error.message });
        }
    }

    async eliminar(req: Request, res: Response): Promise<void> {
        const { id } = req.params;

        try {
            await this.eliminarProductoUseCase.execute(parseInt(id));
            res.status(200).json({ message: 'Producto eliminado con exito' });
        } catch (error: any) {
            res.status(500).json({ message: 'Error al eliminar el producto: ' + error.message });
        }
    }
        // Método para actualizar el stock del producto
    async actualizarStock(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const { cantidad } = req.body;
        try {
            await this.actualizarStockProductoUseCase.execute(parseInt(id), cantidad);
            res.status(200).json({ message: 'Stock del producto actualizado con éxito' });
        } catch (error: any) {
            res.status(500).json({ message: 'Error al actualizar el stock del producto: ' + error.message });
        }
    }

    // Método para cambiar el estado del producto
    async cambiarEstado(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const { estado } = req.body;
        try {
            await this.cambiarEstadoProductoUseCase.execute(parseInt(id), estado);
            res.status(200).json({ message: 'Estado del producto cambiado con éxito' });
        } catch (error: any) {
            res.status(500).json({ message: 'Error al cambiar el estado del producto: ' + error.message });
        }
    }
}
