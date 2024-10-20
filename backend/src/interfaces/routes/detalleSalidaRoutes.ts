import { Router } from 'express';
import {detalleSalidaController} from '../controllers/DetalleSalidaController';
import { CrearDetalleSalidaUseCase } from '../../application/use-cases/detalle-salida/CrearDetalleSalidaUseCase';
import { ObtenerTodosDetallesSalidaUseCase } from '../../application/use-cases/detalle-salida/ObtenerTodosDetallesSalidaUseCase';
import { ObtenerDetalleSalidaPorIdUseCase } from '../../application/use-cases/detalle-salida/ObtenerDetalleSalidaPorIdUseCase';
import { ActualizarDetalleSalidaUseCase } from '../../application/use-cases/detalle-salida/ActualizarDetalleSalidaUseCase';
import { EliminarDetalleSalidaUseCase } from '../../application/use-cases/detalle-salida/EliminarDetalleSalidaUseCase';
import { MySQLDetalleSalidaRepository } from '../../infrastructure/database/mysql/MySQLDetalleSalidaRepository';

const detalleSalidaRouter = Router();

const detalleSalidaRepository = new MySQLDetalleSalidaRepository();
const crearDetalleSalidaUseCase = new CrearDetalleSalidaUseCase(detalleSalidaRepository);
const obtenerTodosDetallesSalidaUseCase = new ObtenerTodosDetallesSalidaUseCase(detalleSalidaRepository);
const obtenerDetalleSalidaPorIdUseCase = new ObtenerDetalleSalidaPorIdUseCase(detalleSalidaRepository);
const actualizarDetalleSalidaUseCase = new ActualizarDetalleSalidaUseCase(detalleSalidaRepository);
const eliminarDetalleSalidaUseCase = new EliminarDetalleSalidaUseCase(detalleSalidaRepository);
const detalleSalidaController = new DetalleSalidaController(
  crearDetalleSalidaUseCase,
  obtenerTodosDetallesSalidaUseCase,
  obtenerDetalleSalidaPorIdUseCase,
  actualizarDetalleSalidaUseCase,
  eliminarDetalleSalidaUseCase
);

detalleSalidaRouter.post('/', (req, res) => detalleSalidaController.crear(req, res));
detalleSalidaRouter.get('/', (req, res) => detalleSalidaController.obtenerTodosDetallesSalida(req, res));
detalleSalidaRouter.get('/:id', (req, res) => detalleSalidaController.obtenerDetalleSalidaPorId(req, res));
detalleSalidaRouter.put('/:id', (req, res) => detalleSalidaController.actualizar(req, res));
detalleSalidaRouter.delete('/:id', (req, res) => detalleSalidaController.eliminar(req, res));

export default detalleSalidaRouter;