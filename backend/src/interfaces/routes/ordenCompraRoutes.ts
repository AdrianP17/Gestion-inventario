import { Router } from 'express';
import { OrdenCompraController } from '../controllers/OrdenCompraController';
import { CrearOrdenCompraUseCase } from '../../application/use-cases/orden-compra/CrearOrdenCompraUseCase';
import { ObtenerTodasOrdenesCompraUseCase } from '../../application/use-cases/orden-compra/ObtenerTodasOrdenesCompraUseCase';
import { ObtenerOrdenCompraPorIdUseCase } from '../../application/use-cases/orden-compra/ObtenerOrdenCompraPorIdUseCase';
import { ActualizarOrdenCompraUseCase } from '../../application/use-cases/orden-compra/ActualizarOrdenCompraUseCase';
import { EliminarOrdenCompraUseCase } from '../../application/use-cases/orden-compra/EliminarOrdenCompraUseCase';
import { MySQLOrdenCompraRepository } from '../../infrastructure/database/mysql/MySQLOrdenCompraRepository';
import { MySQLProveedorRepository } from '../../infrastructure/database/mysql/MySQLProveedorRepository';
import { PostgreSQLProveedorRepository } from '../../infrastructure/database/postgresql/PostgreSQLProveedorRepository';
import { PostgreSQLOrdenCompraRepository } from '../../infrastructure/database/postgresql/PostgreSQLOrdenCompraRepository';
const ordenCompraRouter = Router();
//MYSQL
// const ordenCompraRepository = new MySQLOrdenCompraRepository();
// const proveedorRepository = new MySQLProveedorRepository();

//POSTGRESQL
const ordenCompraRepository = new PostgreSQLOrdenCompraRepository();
const proveedorRepository = new PostgreSQLProveedorRepository();

const crearOrdenCompraUseCase2 = new CrearOrdenCompraUseCase(ordenCompraRepository);
const obtenerTodasOrdenesCompraUseCase2 = new ObtenerTodasOrdenesCompraUseCase(ordenCompraRepository);
const obtenerOrdenCompraPorIdUseCase2 = new ObtenerOrdenCompraPorIdUseCase(ordenCompraRepository);
const actualizarOrdenCompraUseCase2 = new ActualizarOrdenCompraUseCase(ordenCompraRepository, proveedorRepository);
const eliminarOrdenCompraUseCase2 = new EliminarOrdenCompraUseCase(ordenCompraRepository);
const ordenCompraController = new OrdenCompraController(
  crearOrdenCompraUseCase2,
  actualizarOrdenCompraUseCase2,
  obtenerTodasOrdenesCompraUseCase2,
  eliminarOrdenCompraUseCase2,
  obtenerOrdenCompraPorIdUseCase2
);





ordenCompraRouter.post('/', (req, res) => ordenCompraController.crear(req, res));
ordenCompraRouter.get('/', (req, res) => ordenCompraController.obtenerTodos(req, res));
ordenCompraRouter.get('/:id', (req, res) => ordenCompraController.obtenerPorId(req, res));
ordenCompraRouter.put('/:id', (req, res) => ordenCompraController.actualizar(req, res));
ordenCompraRouter.delete('/:id', (req, res) => ordenCompraController.eliminar(req, res));

export default ordenCompraRouter;