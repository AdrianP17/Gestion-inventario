import { Router } from 'express';
import { DetalleCompraController } from '../controllers/DetalleCompraController';
import { CrearDetalleCompraUseCase } from '../../application/use-cases/detalle-compra/CrearDetalleCompraUseCase';
import { ObtenerTodosDetallesCompraUseCase } from '../../application/use-cases/detalle-compra/ObtenerTodosDetallesCompraUseCase';
import { ObtenerDetalleCompraPorIdUseCase } from '../../application/use-cases/detalle-compra/ObtenerDetalleCompraPorIdUseCase';
import { ActualizarDetalleCompraUseCase } from '../../application/use-cases/detalle-compra/ActualizarDetalleCompraUseCase';
import { EliminarDetalleCompraUseCase } from '../../application/use-cases/detalle-compra/EliminarDetalleCompraUseCase';
import { MySQLDetalleCompraRepository } from '../../infrastructure/database/mysql/MySQLDetalleCompraRepository';

const detalleCompraRouter = Router();

const detalleCompraRepository = new MySQLDetalleCompraRepository();
const crearDetalleCompraUseCase = new CrearDetalleCompraUseCase(detalleCompraRepository);
const obtenerTodosDetallesCompraUseCase = new ObtenerTodosDetallesCompraUseCase(detalleCompraRepository);
const obtenerDetalleCompraPorIdUseCase = new ObtenerDetalleCompraPorIdUseCase(detalleCompraRepository);
const actualizarDetalleCompraUseCase = new ActualizarDetalleCompraUseCase(detalleCompraRepository);
const eliminarDetalleCompraUseCase = new EliminarDetalleCompraUseCase(detalleCompraRepository);
const detalleCompraController = new DetalleCompraController(
  crearDetalleCompraUseCase,
  obtenerTodosDetallesCompraUseCase,
  obtenerDetalleCompraPorIdUseCase,
  actualizarDetalleCompraUseCase,
  eliminarDetalleCompraUseCase
);

detalleCompraRouter.post('/', (req, res) => detalleCompraController.crear(req, res));
detalleCompraRouter.get('/', (req, res) => detalleCompraController.obtenerTodosDetallesCompra(req, res));
detalleCompraRouter.get('/:id', (req, res) => detalleCompraController.obtenerDetalleCompraPorId(req, res));
detalleCompraRouter.put('/:id', (req, res) => detalleCompraController.actualizar(req, res));
detalleCompraRouter.delete('/:id', (req, res) => detalleCompraController.eliminar