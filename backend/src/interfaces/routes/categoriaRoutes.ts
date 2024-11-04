import { Router } from 'express';
import { CategoriaController } from '../controllers/CategoriaController';
import { CrearCategoriaUseCase } from '../../application/use-cases/categoria/CrearCategoriaUseCase';
import { ObtenerTodasCategoriasUseCase } from '../../application/use-cases/categoria/ObtenerTodasCategoriasUseCase';
import { ObtenerCategoriaPorIdUseCase } from '../../application/use-cases/categoria/ObtenerCategoriaPorIdUseCase';
import { ActualizarCategoriaUseCase } from '../../application/use-cases/categoria/ActualizarCategoriaUseCase';
import { EliminarCategoriaUseCase } from '../../application/use-cases/categoria/EliminarCategoriaUseCase';
import { MySQLCategoriaRepository } from '../../infrastructure/database/mysql/MySQLCategoriaRepository';

const categoriaRouter = Router();

const categoriaRepository = new MySQLCategoriaRepository();
const crearCategoriaUseCase = new CrearCategoriaUseCase(categoriaRepository);
const obtenerTodasCategoriasUseCase = new ObtenerTodasCategoriasUseCase(categoriaRepository);
const obtenerCategoriaPorIdUseCase = new ObtenerCategoriaPorIdUseCase(categoriaRepository);
const actualizarCategoriaUseCase = new ActualizarCategoriaUseCase(categoriaRepository);
const eliminarCategoriaUseCase = new EliminarCategoriaUseCase(categoriaRepository);
const categoriaController = new CategoriaController(
  crearCategoriaUseCase,
  obtenerTodasCategoriasUseCase,
  obtenerCategoriaPorIdUseCase,
  actualizarCategoriaUseCase,
  eliminarCategoriaUseCase
);

categoriaRouter.post('/', (req, res) => {
  console.log(req.body); 
  categoriaController.crear(req, res)});
categoriaRouter.get('/', (req, res) => categoriaController.obtenerTodasCategorias(req, res));
categoriaRouter.get('/:id', (req, res) => categoriaController.obtenerPorId(req, res));
categoriaRouter.put('/:id', (req, res) => categoriaController.actualizar(req, res));
categoriaRouter.delete('/:id', (req, res) => categoriaController.eliminar(req, res));

export default categoriaRouter;