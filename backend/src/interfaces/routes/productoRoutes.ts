import { Router } from 'express';
import { ProductoController } from '../controllers/ProductoController';
import { CrearProductoUseCase } from '../../application/use-cases/producto/CrearProductoUseCase';
import { ObtenerTodosProductosUseCase } from '../../application/use-cases/producto/ObtenerTodosProductosUseCase';
import { ObtenerProductoPorIdUseCase } from '../../application/use-cases/producto/ObtenerProductoPorIdUseCase';
import { ActualizarProductoUseCase } from '../../application/use-cases/producto/ActualizarProductoUseCase';
import { EliminarProductoUseCase } from '../../application/use-cases/producto/EliminarProductoUseCase';
import { ObtenerListaProductosUseCase } from '../../application/use-cases/producto/ObtenerListaProductosUseCase';
import { ObtenerInventarioProductosUseCase } from '../../application/use-cases/producto/ObtenerInventarioProductosUseCase';
import { ObtenerProductosMaximosUseCase } from '../../application/use-cases/producto/ObtenerProductosMaximos';
import { ObtenerProductosMinimosUseCase } from '../../application/use-cases/producto/ObtenerProductosMinimosUseCase';
import { MySQLProductoRepository } from '../../infrastructure/database/mysql/MySQLProductoRepository';
import { PostgreSQLProductoRepository } from '../../infrastructure/database/postgresql/PostgreSQLProductoRepository';
const productoRouter = Router();

//POSTGRESQL
const postgresqlproductoRepository = new PostgreSQLProductoRepository();

// const crearProductoUseCase = new CrearProductoUseCase(postgresqlproductoRepository);
// const obtenerListaProductosUseCase = new ObtenerListaProductosUseCase(postgresqlproductoRepository);
// const obtenerTodosProductosUseCase = new ObtenerTodosProductosUseCase(postgresqlproductoRepository);
// const obtenerProductoPorIdUseCase = new ObtenerProductoPorIdUseCase(postgresqlproductoRepository);
// const actualizarProductoUseCase = new ActualizarProductoUseCase(postgresqlproductoRepository);
// const eliminarProductoUseCase = new EliminarProductoUseCase(postgresqlproductoRepository);
// const obtenerInventarioProductosUseCase = new ObtenerInventarioProductosUseCase(postgresqlproductoRepository);
// const obtenerProductosMaximosUseCase = new ObtenerProductosMaximosUseCase(postgresqlproductoRepository);
// const obtenerProductosMinimosUseCase = new ObtenerProductosMinimosUseCase(postgresqlproductoRepository);


//MYSQL
const MySQLproductoRepository = new MySQLProductoRepository();

const crearProductoUseCase = new CrearProductoUseCase(MySQLproductoRepository);
const obtenerListaProductosUseCase = new ObtenerListaProductosUseCase(MySQLproductoRepository);
const obtenerTodosProductosUseCase = new ObtenerTodosProductosUseCase(MySQLproductoRepository);
const obtenerProductoPorIdUseCase = new ObtenerProductoPorIdUseCase(MySQLproductoRepository);
const actualizarProductoUseCase = new ActualizarProductoUseCase(MySQLproductoRepository);
const eliminarProductoUseCase = new EliminarProductoUseCase(MySQLproductoRepository);
const obtenerInventarioProductosUseCase = new ObtenerInventarioProductosUseCase(MySQLproductoRepository);
const obtenerProductosMaximosUseCase = new ObtenerProductosMaximosUseCase(MySQLproductoRepository);
const obtenerProductosMinimosUseCase = new ObtenerProductosMinimosUseCase(MySQLproductoRepository);

const productoController = new ProductoController(
  crearProductoUseCase,
  obtenerTodosProductosUseCase,
  obtenerProductoPorIdUseCase,
  actualizarProductoUseCase,
  eliminarProductoUseCase,
  obtenerListaProductosUseCase,
  obtenerInventarioProductosUseCase,
  obtenerProductosMaximosUseCase,
  obtenerProductosMinimosUseCase
);

productoRouter.post('/', (req, res) => {
  console.log(req.body); 
  productoController.crear(req, res)});
productoRouter.get('/', (req, res) => productoController.obtenerTodosProductos(req, res));
productoRouter.get('/inventario', (req, res) => productoController.obtenerInventario(req, res));
productoRouter.get('/info/:id', (req, res) => productoController.obtenerPorId(req, res));
productoRouter.put('/:id', (req, res) => productoController.actualizar(req, res));
productoRouter.delete('/:id', (req, res) => productoController.eliminar(req, res));
productoRouter.get('/lista', (req, res) => productoController.obtenerlista(req, res));
productoRouter.get('/maximos', (req, res) => productoController.obtenerMaximos(req, res));
productoRouter.get('/minimos', (req, res) => productoController.obtenerMinimos(req, res));
export default productoRouter;