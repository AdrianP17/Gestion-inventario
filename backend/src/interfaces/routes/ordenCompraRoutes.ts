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
const mysqlordenCompraRepository = new MySQLOrdenCompraRepository();
const mysqlproveedorRepository = new MySQLProveedorRepository();

//POSTGRESQL
const postgresqlordenCompraRepository = new PostgreSQLOrdenCompraRepository();
const postgresqlproveedorRepository = new PostgreSQLProveedorRepository();

const crearOrdenCompraUseCase = new CrearOrdenCompraUseCase(postgresqlordenCompraRepository);
const obtenerTodasOrdenesCompraUseCase = new ObtenerTodasOrdenesCompraUseCase(postgresqlordenCompraRepository);
const obtenerOrdenCompraPorIdUseCase = new ObtenerOrdenCompraPorIdUseCase(postgresqlordenCompraRepository);
const actualizarOrdenCompraUseCase = new ActualizarOrdenCompraUseCase(postgresqlordenCompraRepository, postgresqlproveedorRepository);
const eliminarOrdenCompraUseCase = new EliminarOrdenCompraUseCase(postgresqlordenCompraRepository);
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