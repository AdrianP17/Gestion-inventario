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

//POSTGRESQL
// const proveedorRepository = new PostgreSQLProveedorRepository();


//MYSQL
const proveedorRepository = new MySQLProveedorRepository();

const crearProveedorUseCase = new CrearProveedorUseCase(proveedorRepository);
const obtenerTodosProveedoresUseCase = new ObtenerTodosProveedoresUseCase(proveedorRepository);
const obtenerListaProveedores = new ObtenerListaProveedorUseCase(proveedorRepository);
const obtenerProveedorPorIdUseCase = new ObtenerProveedorPorIdUseCase(proveedorRepository);
const actualizarProveedorUseCase = new ActualizarProveedorUseCase(proveedorRepository);
const eliminarProveedorUseCase = new EliminarProveedorUseCase(proveedorRepository);
const proveedorController = new ProveedorController(
  crearProveedorUseCase,
  obtenerTodosProveedoresUseCase,
  obtenerProveedorPorIdUseCase,
  actualizarProveedorUseCase,
  eliminarProveedorUseCase,
  obtenerListaProveedores
);

proveedorRouter.post('/', (req, res) => {
  console.log(req.body); 
  proveedorController.crear(req, res)});
proveedorRouter.get('/', (req, res) => proveedorController.obtenerTodosProveedores(req, res));
proveedorRouter.get('/info/:id', (req, res) => proveedorController.obtenerPorId(req, res));
proveedorRouter.put('/:id', (req, res) => proveedorController.actualizar(req, res));
proveedorRouter.delete('/:id', (req, res) => proveedorController.eliminar(req, res));
proveedorRouter.post('/', (req, res) => proveedorController.crear(req, res));
proveedorRouter.get('/lista', (req, res) => proveedorController.obtenerLista(req, res));

export default proveedorRouter;