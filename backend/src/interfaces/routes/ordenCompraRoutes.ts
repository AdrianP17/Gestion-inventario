import { Router } from 'express';
import { OrdenCompraController } from '../controllers/OrdenCompraController';
import { CrearOrdenCompraUseCase } from '../../application/use-cases/orden-compra/CrearOrdenCompraUseCase';
import { ObtenerTodasOrdenesCompraUseCase } from '../../application/use-cases/orden-compra/ObtenerTodasOrdenesCompraUseCase';
import { ObtenerOrdenCompraPorIdUseCase } from '../../application/use-cases/orden-compra/ObtenerOrdenCompraPorIdUseCase';
import { ActualizarOrdenCompraUseCase } from '../../application/use-cases/orden-compra/ActualizarOrdenCompraUseCase';
import { EliminarOrdenCompraUseCase } from '../../application/use-cases/orden-compra/EliminarOrdenCompraUseCase';
import { MySQLOrdenCompraRepository } from '../../infrastructure/database/mysql/MySQLOrdenCompraRepository';
import { MySQLProveedorRepository } from '../../infrastructure/database/mysql/MySQLProveedorRepository';

const ordenCompraRouter = Router();

const ordenCompraRepository = new MySQLOrdenCompraRepository();
const proveedorRepository = new MySQLProveedorRepository();
const crearOrdenCompraUseCase = new CrearOrdenCompraUseCase(ordenCompraRepository);
const obtenerTodasOrdenesCompraUseCase = new ObtenerTodasOrdenesCompraUseCase(ordenCompraRepository);
const obtenerOrdenCompraPorIdUseCase = new ObtenerOrdenCompraPorIdUseCase(ordenCompraRepository);
const actualizarOrdenCompraUseCase = new ActualizarOrdenCompraUseCase(ordenCompraRepository, proveedorRepository);
const eliminarOrdenCompraUseCase = new EliminarOrdenCompraUseCase(ordenCompraRepository);
const ordenCompraController = new OrdenCompraController(
  crearOrdenCompraUseCase,
  actualizarOrdenCompraUseCase,
  obtenerTodasOrdenesCompraUseCase,
  eliminarOrdenCompraUseCase,
  obtenerOrdenCompraPorIdUseCase
);

ordenCompraRouter.post('/', (req, res) => ordenCompraController.crear(req, res));
ordenCompraRouter.get('/', (req, res) => ordenCompraController.obtenerTodos(req, res));
ordenCompraRouter.get('/:id', (req, res) => ordenCompraController.obtenerPorId(req, res));
ordenCompraRouter.put('/:id', (req, res) => ordenCompraController.actualizar(req, res));
ordenCompraRouter.delete('/:id', (req, res) => ordenCompraController.eliminar(req, res));

export default ordenCompraRouter;