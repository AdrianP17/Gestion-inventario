import { Router } from 'express';
import { SalidaInventarioController } from '../controllers/SalidaInventarioController';
import { CrearSalidaInventarioUseCase } from '../../application/use-cases/salida-inventario/CrearSalidaInventarioUseCase';
import { ObtenerTodasSalidasInventarioUseCase } from '../../application/use-cases/salida-inventario/ObtenerTodasSalidasInventarioUseCase';
import { ObtenerSalidaInventarioPorIdUseCase } from '../../application/use-cases/salida-inventario/ObtenerSalidaInventarioPorIdUseCase';
import { ActualizarSalidaInventarioUseCase } from '../../application/use-cases/salida-inventario/ActualizarSalidaInventarioUseCase';
import { EliminarSalidaInventarioUseCase } from '../../application/use-cases/salida-inventario/EliminarSalidaInventarioUseCase';
import { MySQLSalidaInventarioRepository } from '../../infrastructure/database/mysql/MySQLSalidaInventarioRepository';
import { PostgreSQLSalidaInventarioRepository } from '../../infrastructure/database/postgresql/PostgreSQLSalidaInventarioRepository';
const salidaInventarioRouter = Router();

//POSTGRESQL
// const salidaInventarioRepository = new PostgreSQLSalidaInventarioRepository();

//MYSQL
const salidaInventarioRepository = new MySQLSalidaInventarioRepository();

const crearSalidaInventarioUseCase = new CrearSalidaInventarioUseCase(salidaInventarioRepository);
const obtenerTodasSalidasInventarioUseCase = new ObtenerTodasSalidasInventarioUseCase(salidaInventarioRepository);
const obtenerSalidaInventarioPorIdUseCase = new ObtenerSalidaInventarioPorIdUseCase(salidaInventarioRepository);
const actualizarSalidaInventarioUseCase = new ActualizarSalidaInventarioUseCase(salidaInventarioRepository);
const eliminarSalidaInventarioUseCase = new EliminarSalidaInventarioUseCase(salidaInventarioRepository);
const salidaInventarioController = new SalidaInventarioController(
  crearSalidaInventarioUseCase,
  obtenerTodasSalidasInventarioUseCase,
  obtenerSalidaInventarioPorIdUseCase,
  actualizarSalidaInventarioUseCase,
  eliminarSalidaInventarioUseCase
);

salidaInventarioRouter.post('/', (req, res) => salidaInventarioController.crearSalida(req, res));
salidaInventarioRouter.get('/', (req, res) => salidaInventarioController.obtenerTodasSalidas(req, res));
salidaInventarioRouter.get('/:id', (req, res) => salidaInventarioController.obtenerSalidaPorId(req, res));
salidaInventarioRouter.put('/:id', (req, res) => salidaInventarioController.actualizarSalida(req, res));
salidaInventarioRouter.delete('/:id', (req, res) => salidaInventarioController.eliminarSalida(req, res));

export default salidaInventarioRouter;