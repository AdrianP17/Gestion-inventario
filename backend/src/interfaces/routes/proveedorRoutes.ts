import { Router } from 'express';
import { ProveedorController } from '../controllers/ProveedorController';
import { CrearProveedorUseCase } from '../../application/use-cases/proveedor/CrearProveedorUseCase';
import { ObtenerTodosProveedoresUseCase } from '../../application/use-cases/proveedor/ObtenerTodosProveedoresUseCase';
import { ObtenerProveedorPorIdUseCase } from '../../application/use-cases/proveedor/ObtenerProveedorPorIdUseCase';
import { ActualizarProveedorUseCase } from '../../application/use-cases/proveedor/ActualizarProveedorUseCase';
import { EliminarProveedorUseCase } from '../../application/use-cases/proveedor/EliminarProveedorUseCase';
import { ObtenerListaProveedorUseCase } from '../../application/use-cases/proveedor/ObtenerListaProveedoresUseCase';
import { MySQLProveedorRepository } from '../../infrastructure/database/mysql/MySQLProveedorRepository';
import { PostgreSQLProveedorRepository } from '../../infrastructure/database/postgresql/PostgreSQLProveedorRepository';
const proveedorRouter = Router();

const proveedorRepository = new MySQLProveedorRepository();
const postgresqlProveedorRepository = new PostgreSQLProveedorRepository();

const crearProveedorUseCase = new CrearProveedorUseCase(postgresqlProveedorRepository);
const obtenerTodosProveedoresUseCase = new ObtenerTodosProveedoresUseCase(postgresqlProveedorRepository);
const obtenerListaProveedores = new ObtenerListaProveedorUseCase(postgresqlProveedorRepository);
const obtenerProveedorPorIdUseCase = new ObtenerProveedorPorIdUseCase(postgresqlProveedorRepository);
const actualizarProveedorUseCase = new ActualizarProveedorUseCase(postgresqlProveedorRepository);
const eliminarProveedorUseCase = new EliminarProveedorUseCase(postgresqlProveedorRepository);
const proveedorController = new ProveedorController(
  crearProveedorUseCase,
  obtenerListaProveedores
);

proveedorRouter.post('/', (req, res) => {
  console.log(req.body); 
  proveedorController.crear(req, res)});
proveedorRouter.get('/', (req, res) => proveedorController.obtenerTodosProveedores(req, res));
proveedorRouter.get('/info/:id', (req, res) => proveedorController.obtenerPorId(req, res));
proveedorRouter.put('/:id', (req, res) => proveedorController.actualizar(req, res));
proveedorRouter.delete('/:id', (req, res) => proveedorController.eliminar(req, res));

export default proveedorRouter;