import { IProductoRepository } from '../../../domain/repositories/IProductoRepository';
import { Producto } from '../../../domain/entities/Producto';

interface CrearProductoDTO {
    nombre: string;
    categoriaId: number;
    precio: number;
    descripcion: string;
    marca: string;
    modelo: string;
    nivelMaximo: number;
    nivelMinimo: number;
}
export class CrearProductoUseCase {
    constructor(private productoRepository: IProductoRepository) {}

    async execute(data: CrearProductoDTO): Promise<void> {
        const producto = new Producto(
            0, // ID será generado automáticamente por la base de datos
            data.nombre,
            data.categoriaId,
            data.precio,
            data.descripcion,
            data.marca,
            data.modelo,
            data.nivelMaximo,
            data.nivelMinimo
        );
        await this.productoRepository.crear(producto);
    }
}
