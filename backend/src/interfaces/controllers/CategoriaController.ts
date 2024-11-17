import { Request, Response } from 'express';
import { CrearCategoriaUseCase } from '../../application/use-cases/categoria/CrearCategoriaUseCase';
import { ObtenerTodasCategoriasUseCase } from '../../application/use-cases/categoria/ObtenerTodasCategoriasUseCase';
import { ActualizarCategoriaUseCase } from '../../application/use-cases/categoria/ActualizarCategoriaUseCase';
import { EliminarCategoriaUseCase } from '../../application/use-cases/categoria/EliminarCategoriaUseCase';
import { ObtenerCategoriaPorIdUseCase } from '../../application/use-cases/categoria/ObtenerCategoriaPorIdUseCase';

export class CategoriaController {

    constructor(
        private crearCategoriaUseCase: CrearCategoriaUseCase,
        private obtenerTodasCategoriasUseCase: ObtenerTodasCategoriasUseCase,
        private obtenerCategoriaPorIdUseCase: ObtenerCategoriaPorIdUseCase,
        private actualizarCategoriaUseCase: ActualizarCategoriaUseCase,
        private eliminarCategoriaUseCase: EliminarCategoriaUseCase
    ) {}

    async crear(req: Request, res: Response): Promise<void> {
        const { nombre, descripcion } = req.body;
        try {
            await this.crearCategoriaUseCase.execute({
                id: 0,
                nombre,
                descripcion
            });
            res.status(201).json({ message: 'Categoría creada con éxito' });
        } catch (error: any) {
            res.status(500).json({ message: 'Error al crear la categoría: ' + error.message });
        }
    }

    async obtenerTodasCategorias(req: Request, res: Response): Promise<void> {
        try {
            const categorias = await this.obtenerTodasCategoriasUseCase.execute();
            res.json(categorias);
        } catch (error: any) {
            res.status(500).json({ message: 'Error al obtener las categorías: ' + error.message });
        }
    }

    async obtenerPorId(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const categoria = await this.obtenerCategoriaPorIdUseCase.execute(parseInt(id));
            res.json(categoria);
        } catch (error: any) {
            res.status(500).json({ message: 'Error al obtener la categoría por ID: ' + error.message });
        }
    }

    async actualizar(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        //Verificar que el producto exista
        const categoria = await this.obtenerCategoriaPorIdUseCase.execute(parseInt(id));

        if (!categoria) {
            res.status(404).json({ message: 'Categoría no encontrada' });
            return;
        }

        const { nombre, descripcion } = req.body;
        try {
            await this.actualizarCategoriaUseCase.execute({
                id: parseInt(id),
                nombre,
                descripcion
            });
            res.status(200).json({ message: 'Categoría actualizada con éxito' });
        } catch (error: any) {
            res.status(500).json({ message: 'Error al actualizar la categoría: ' + error.message });
        }
    }

    async eliminar(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        //Verificar que el producto exista
        const categoria = await this.obtenerCategoriaPorIdUseCase.execute(parseInt(id));

        if (!categoria) {
            res.status(404).json({ message: 'Categoría no encontrada' });
            return;
        }
        
        try {
            await this.eliminarCategoriaUseCase.execute(parseInt(id));
            res.status(200).json({ message: 'Categoría eliminada con éxito' });
        } catch (error: any) {
            res.status(500).json({ message: 'Error al eliminar la categoría: ' + error.message });
        }
    }
}
