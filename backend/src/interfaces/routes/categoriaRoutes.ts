import { Router } from 'express';
import { CategoriaController } from '../controllers/CategoriaController';
import { CrearCategoriaUseCase } from '../../application/use-cases/categoria/CrearCategoriaUseCase';
import { ObtenerTodasCategoriasUseCase } from '../../application/use-cases/categoria/ObtenerTodasCategoriasUseCase';
import { ObtenerCategoriaPorIdUseCase } from '../../application/use-cases/categoria/ObtenerCategoriaPorIdUseCase';
import { ActualizarCategoriaUseCase } from '../../application/use-cases/categoria/ActualizarCategoriaUseCase';
import { EliminarCategoriaUseCase } from '../../application/use-cases/categoria/EliminarCategoriaUseCase';
import { MySQLCategoriaRepository } from '../../infrastructure/database/mysql/MySQLCategoriaRepository';
import { PostgreSQLCategoriaRepository } from '../../infrastructure/database/postgresql/PostgreSQLCategoriaRepository';

const categoriaRouter = Router();

const MySQLcategoriaRepository = new MySQLCategoriaRepository();
const PostgreSQLcategoriaRepository = new PostgreSQLCategoriaRepository();


// POSTGRESQL
// const crearCategoriaUseCase = new CrearCategoriaUseCase(PostgreSQLcategoriaRepository);
// const obtenerTodasCategoriasUseCase = new ObtenerTodasCategoriasUseCase(PostgreSQLcategoriaRepository);
// const obtenerCategoriaPorIdUseCase = new ObtenerCategoriaPorIdUseCase(PostgreSQLcategoriaRepository);
// const actualizarCategoriaUseCase = new ActualizarCategoriaUseCase(PostgreSQLcategoriaRepository);
// const eliminarCategoriaUseCase = new EliminarCategoriaUseCase(PostgreSQLcategoriaRepository);
// const categoriaController = new CategoriaController(
//   crearCategoriaUseCase,
//   obtenerTodasCategoriasUseCase,
//   obtenerCategoriaPorIdUseCase,
//   actualizarCategoriaUseCase,
//   eliminarCategoriaUseCase
// );

// MYSQL
const crearCategoriaUseCase = new CrearCategoriaUseCase(MySQLcategoriaRepository);
const obtenerTodasCategoriasUseCase = new ObtenerTodasCategoriasUseCase(MySQLcategoriaRepository);
const obtenerCategoriaPorIdUseCase = new ObtenerCategoriaPorIdUseCase(MySQLcategoriaRepository);
const actualizarCategoriaUseCase = new ActualizarCategoriaUseCase(MySQLcategoriaRepository);
const eliminarCategoriaUseCase = new EliminarCategoriaUseCase(MySQLcategoriaRepository);
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