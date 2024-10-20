import { Router } from 'express';
import { OrdenCompraController } from '../controllers/OrdenCompraController';
import { CrearOrdenCompraUseCase } from '../../application/use-cases/orden-compra/CrearOrdenCompraUseCase';
import { ObtenerTodasOrdenesCompraUseCase } from '../../application/use-cases/orden-compra/ObtenerTodasOrdenesCompraUseCase';
import { ObtenerOrdenCompraPorIdUseCase } from '../../application/use-cases/orden-compra/ObtenerOrdenCompraPorIdUseCase';
import { ActualizarOrdenCompraUseCase } from '../../application/use-cases/orden-compra/ActualizarOrdenCompraUseCase';
import { EliminarOrdenCompraUseCase } from '../../application/use-cases/orden-compra/EliminarOrdenCompraUseCase';
import { MySQLOrdenCompraRepository } from '../../infrastructure/database/mysql/MySQLOrdenCompraRepository';

const ordenCompraRouter = Router();

const ordenCompraRepository = new MySQLOrdenCompraRepository();
const crearOrdenCompraUseCase = new CrearOrdenCompraUseCase(ordenCompraRepository);
const obtenerTodasOrdenesCompraUseCase = new ObtenerTodasOrdenesCompraUseCase(ordenCompraRepository);
const obtenerOrdenCompraPorIdUseCase = new ObtenerOrdenCompraPorIdUseCase(ordenCompraRepository);
const actualizarOrdenCompraUseCase = new ActualizarOrdenCompraUseCase(ordenCompraRepository);
const eliminarOrdenCompraUseCase = new EliminarOrdenCompraUseCase(ordenCompraRepository);
const ordenCompraController = new OrdenCompraController(
  crearOrdenCompraUseCase,
  obtenerTodasOrdenesCompraUseCase,
  obtenerOrdenCompraPorIdUseCase,
  actualizarOrdenCompraUseCase,
  eliminarOrdenCompraUseCase
);

ordenCompraRouter.post('/', (req, res) => ordenCompraController.crear(req, res));
ordenCompraRouter.get('/', (req, res) => ordenCompraController.obtenerTodasOrdenesCompra(req, res));
ordenCompraRouter.get('/:id', (req, res) => ordenCompraController.obtenerOrdenCompraPorId(req, res));
ordenCompraRouter.put('/:id', (req, res) => ordenCompraController.actualizar(req, res));
ordenCompraRouter.delete('/:id', (req, res) => ordenCompraController.eliminar(req, res));

export default ordenCompraRouter;