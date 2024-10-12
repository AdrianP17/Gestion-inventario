import {Request, Response} from 'express'
import { CrearProductoUseCase } from '../../application/use-cases/producto/CrearProductoUseCase'
import { ObtenerTodosProductosUseCase } from '../../application/use-cases/producto/ObtenerTodosProductosUseCase'
import { Producto } from '../../domain/entities/Producto'

export class ProductoController {

    constructor(
        private crearProductoUseCase: CrearProductoUseCase,
        private obtenerTodosProductosUseCase: ObtenerTodosProductosUseCase
    ) {}

    async crear(req: Request, res: Response): Promise<void> {
        const { nombre, categoriaId, precio, descripcion, marca, modelo, nivelMaximo, nivelMinimo } = req.body;

        try {
            await this.crearProductoUseCase.execute({
                nombre,
                categoriaId,
                precio,
                descripcion,
                marca,
                modelo,
                nivelMaximo,
                nivelMinimo
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
    
}