import { Router } from 'express';
import { DetalleSalidaController } from '../controllers/DetalleSalidaController';
import { CrearDetalleSalidaUseCase } from '../../application/use-cases/detalle-salida/CrearDetalleSalidaUseCase';

import { MySQLDetalleSalidaRepository } from '../../infrastructure/database/mysql/MySQLDetalleSalidaRepository';
import { PostgreSQLDetalleSalidaRepository } from '../../infrastructure/database/postgresql/PostgreSQLDetalleSalidaRepository';
const detalleSalidaRouter = Router();

//POSTGRESQL
// const detalleSalidaRepository = new PostgreSQLDetalleSalidaRepository();

//MYSQL
const detalleSalidaRepository = new MySQLDetalleSalidaRepository();

const crearDetalleSalidaUseCase = new CrearDetalleSalidaUseCase(detalleSalidaRepository);

const detalleSalidaController = new DetalleSalidaController(
  crearDetalleSalidaUseCase,
);



detalleSalidaRouter.post('/', (req, res) => detalleSalidaController.crear(req, res));
// detalleSalidaRouter.get('/', (req, res) => detalleSalidaController.obtenerTodosDetallesSalida(req, res));
// detalleSalidaRouter.get('/:id', (req, res) => detalleSalidaController.obtenerDetalleSalidaPorId(req, res));
// detalleSalidaRouter.put('/:id', (req, res) => detalleSalidaController.actualizar(req, res));
// detalleSalidaRouter.delete('/:id', (req, res) => detalleSalidaController.eliminar(req, res));

export default detalleSalidaRouter;