import {Request, Response} from 'express'
import { CrearProductoUseCase } from '../../application/use-cases/CrearProductoUseCase'
import { Producto } from '../../domain/entities/Producto'

export class ProductoController {

    constructor(private crearProductoUseCase: CrearProductoUseCase) {}

    async crear(request: Request, response: Response) {
        const { nombre, categoriaId, precio,descripcion,marca,modelo,nivelMaximo,nivelMinimo } = request.body
        const producto = new Producto(0, nombre, categoriaId, precio, descripcion, marca, modelo, nivelMaximo, nivelMinimo);
        await this.crearProductoUseCase.execute(producto);
        response.status(201).send({
            message: 'Producto creado exitosamente'})
    }
}