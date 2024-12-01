import { Router } from 'express';
import { DetalleSalidaController } from '../controllers/DetalleSalidaController';
import { CrearDetalleSalidaUseCase } from '../../application/use-cases/detalle-salida/CrearDetalleSalidaUseCase';
import { ObtenerTodosDetallesSalidaUseCase } from '../../application/use-cases/detalle-salida/ObtenerTodosDetallesSalidaUseCase';

import { MySQLDetalleSalidaRepository } from '../../infrastructure/database/mysql/MySQLDetalleSalidaRepository';
import { PostgreSQLDetalleSalidaRepository } from '../../infrastructure/database/postgresql/PostgreSQLDetalleSalidaRepository';
const detalleSalidaRouter = Router();

const detalleSalidaRepository = new MySQLDetalleSalidaRepository();
const postgreSQLDetalleSalidaRepository = new PostgreSQLDetalleSalidaRepository();
const crearDetalleSalidaUseCase = new CrearDetalleSalidaUseCase(detalleSalidaRepository);
const obtenerTodosDetallesSalidaUseCase = new ObtenerTodosDetallesSalidaUseCase(detalleSalidaRepository);

const detalleSalidaController = new DetalleSalidaController(
  crearDetalleSalidaUseCase,

);

detalleSalidaRouter.post('/', (req, res) => detalleSalidaController.crear(req, res));
// detalleSalidaRouter.get('/', (req, res) => detalleSalidaController.obtenerTodosDetallesSalida(req, res));
// detalleSalidaRouter.get('/:id', (req, res) => detalleSalidaController.obtenerDetalleSalidaPorId(req, res));
// detalleSalidaRouter.put('/:id', (req, res) => detalleSalidaController.actualizar(req, res));
// detalleSalidaRouter.delete('/:id', (req, res) => detalleSalidaController.eliminar(req, res));

export default detalleSalidaRouter;