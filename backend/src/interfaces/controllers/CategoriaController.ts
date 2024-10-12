import { Request, Response } from 'express';
import { CrearCategoriaUseCase } from '../../application/use-cases/categoria/CrearCategoriaUseCase';
import { ObtenerTodasCategoriasUseCase } from '../../application/use-cases/categoria/ObtenerTodasCategoriasUseCase';
import { Categoria } from '../../domain/entities/Categoria';

export class CategoriaController {
  constructor(
    private crearCategoriaUseCase: CrearCategoriaUseCase,
    private obtenerTodasCategoriasUseCase: ObtenerTodasCategoriasUseCase
  ) {}

  async crearCategoria(req: Request, res: Response): Promise<void> {
    try {
      const { nombre, descripcion } = req.body;
      const categoria = new Categoria(0, nombre, descripcion);
      await this.crearCategoriaUseCase.execute(categoria);
      res.status(201).send({ mensaje: 'Categoría creada exitosamente' });
    } catch (error:any) {
      res.status(400).send({ error: error.message });
    }
  }

  async obtenerTodasCategorias(req: Request, res: Response): Promise<void> {
    try {
      const categorias = await this.obtenerTodasCategoriasUseCase.execute();
      res.status(200).json(categorias);
    } catch (error:any) {
      res.status(400).send({ error: error.message });
    }
  }
}
