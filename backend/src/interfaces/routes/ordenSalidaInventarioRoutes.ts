import { Router } from 'express';
import { OrdenSalidaInventarioController } from '../controllers/OrdenSalidaInventarioController';
import { CrearOrdenSalidaInventarioUseCase } from '../../application/use-cases/orden-salida-inventario/CrearOrdenSalidaInventarioUseCase';
import { ObtenerTodasOrdenesSalidasInventarioUseCase } from '../../application/use-cases/orden-salida-inventario/ObtenerTodasOrdenesSalidasInventarioUseCase';
import { ObtenerOrdenSalidaInventarioPorIdUseCase } from '../../application/use-cases/orden-salida-inventario/ObtenerOrdenSalidaInventarioPorIdUseCase';
import { ActualizarOrdenSalidaInventarioUseCase } from '../../application/use-cases/orden-salida-inventario/ActualizarOrdenSalidaInventarioUseCase';
import { EliminarOrdenSalidaInventarioUseCase } from '../../application/use-cases/orden-salida-inventario/EliminarOrdenSalidaInventarioUseCase';
import { MySQLOrdenSalidaInventarioRepository } from '../../infrastructure/database/mysql/MySQLOrdenSalidaInventarioRepository';

const ordenSalidaInventarioRouter = Router();

const ordenSalidaInventarioRepository = new MySQLOrdenSalidaInventarioRepository();
const crearOrdenSalidaInventarioUseCase = new CrearOrdenSalidaInventarioUseCase(ordenSalidaInventarioRepository);
const obtenerTodasOrdenesSalidasInventarioUseCase = new ObtenerTodasOrdenesSalidasInventarioUseCase(ordenSalidaInventarioRepository);
const obtenerOrdenSalidaInventarioPorIdUseCase = new ObtenerOrdenSalidaInventarioPorIdUseCase(ordenSalidaInventarioRepository);
const actualizarOrdenSalidaInventarioUseCase = new ActualizarOrdenSalidaInventarioUseCase(ordenSalidaInventarioRepository);
const eliminarOrdenSalidaInventarioUseCase = new EliminarOrdenSalidaInventarioUseCase(ordenSalidaInventarioRepository);
const ordenSalidaInventarioController = new OrdenSalidaInventarioController(
  crearOrdenSalidaInventarioUseCase,
  obtenerTodasOrdenesSalidasInventarioUseCase,
  obtenerOrdenSalidaInventarioPorIdUseCase,
  actualizarOrdenSalidaInventarioUseCase,
  eliminarOrdenSalidaInventarioUseCase
);

ordenSalidaInventarioRouter.post('/', (req, res) => ordenSalidaInventarioController.crearOrdenSalidaInventario(req, res));
ordenSalidaInventarioRouter.get('/', (req, res) => ordenSalidaInventarioController.obtenerTodasOrdenesSalidas(req, res));
ordenSalidaInventarioRouter.get('/:ID', (req, res) => ordenSalidaInventarioController.obtenerOrdenSalidaPorId(req, res));
ordenSalidaInventarioRouter.put('/:ID', (req, res) => ordenSalidaInventarioController.actualizarOrdenSalida(req, res));
ordenSalidaInventarioRouter.delete('/:ID', (req, res) => ordenSalidaInventarioController.eliminarOrdenSalida(req, res));

export default ordenSalidaInventarioRouter;