import { Router } from 'express';
import {DetalleSalidaController} from '../controllers/DetalleSalidaController';
import { CrearDetalleSalidaUseCase } from '../../application/use-cases/detalle-salida/CrearDetalleSalidaUseCase';
import { ObtenerPorSalidaUseCase } from '../../application/use-cases/detalle-salida/ObtenerPorSalidaUseCase';
import { ActualizarDetalleSalidaUseCase } from '../../application/use-cases/detalle-salida/ActualizarDetalleSalidaUseCase';
import { EliminarDetalleSalidaUseCase } from '../../application/use-cases/detalle-salida/EliminarDetalleSalidaUseCase';
import { MySQLDetalleSalidaRepository } from '../../infrastructure/database/mysql/MySQLDetalleSalidaRepository';

const detalleSalidaRouter = Router();

const detalleSalidaRepository = new MySQLDetalleSalidaRepository();
const crearDetalleSalidaUseCase = new CrearDetalleSalidaUseCase(detalleSalidaRepository);
const obtenerPorSalidaUseCase = new ObtenerPorSalidaUseCase(detalleSalidaRepository);
const actualizarDetalleSalidaUseCase = new ActualizarDetalleSalidaUseCase(detalleSalidaRepository);
const eliminarDetalleSalidaUseCase = new EliminarDetalleSalidaUseCase(detalleSalidaRepository);
const detalleSalidaController = new DetalleSalidaController(
  crearDetalleSalidaUseCase,
  obtenerPorSalidaUseCase,
  actualizarDetalleSalidaUseCase,
  eliminarDetalleSalidaUseCase
);

detalleSalidaRouter.post('/', (req, res) => detalleSalidaController.crear(req, res));
detalleSalidaRouter.get('/:Salida_InventarioID', (req, res) => detalleSalidaController.obtenerPorSalida(req, res));
detalleSalidaRouter.put('/:Salida_InventarioID', (req, res) => detalleSalidaController.actualizar(req, res));
detalleSalidaRouter.delete('/:Salida_InventarioID', (req, res) => detalleSalidaController.eliminar(req, res));

export default detalleSalidaRouter;