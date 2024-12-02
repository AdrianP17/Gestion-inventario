import { Router } from 'express';
import { ProductoController } from '../controllers/ProductoController';
import { CrearProductoUseCase } from '../../application/use-cases/producto/CrearProductoUseCase';
import { ObtenerTodosProductosUseCase } from '../../application/use-cases/producto/ObtenerTodosProductosUseCase';
import { ObtenerProductoPorIdUseCase } from '../../application/use-cases/producto/ObtenerProductoPorIdUseCase';
import { ActualizarProductoUseCase } from '../../application/use-cases/producto/ActualizarProductoUseCase';
import { EliminarProductoUseCase } from '../../application/use-cases/producto/EliminarProductoUseCase';
//YONI
import { ActualizarStockProductoUseCase } from '../../application/use-cases/producto/ActualizarStockProductoUseCase';
import { CambiarEstadoProductoUseCase } from '../../application/use-cases/producto/CambiarEstadoProductoUseCase';
//ADRIAN
import { ObtenerListaProductosUseCase } from '../../application/use-cases/producto/ObtenerListaProductosUseCase';
import { ObtenerInventarioProductosUseCase } from '../../application/use-cases/producto/ObtenerInventarioProductosUseCase';
import { ObtenerProductosMaximosUseCase } from '../../application/use-cases/producto/ObtenerProductosMaximos';
import { ObtenerProductosMinimosUseCase } from '../../application/use-cases/producto/ObtenerProductosMinimosUseCase';
import { MySQLProductoRepository } from '../../infrastructure/database/mysql/MySQLProductoRepository';
import { PostgreSQLProductoRepository } from '../../infrastructure/database/postgresql/PostgreSQLProductoRepository';
const productoRouter = Router();


//POSTGRESQL
// const productoRepository = new PostgreSQLProductoRepository();

//MYSQL
const productoRepository = new MySQLProductoRepository();


const actualizarStockProductoUseCase = new ActualizarStockProductoUseCase(productoRepository);
const cambiarEstadoProductoUseCase = new CambiarEstadoProductoUseCase(productoRepository);
const crearProductoUseCase = new CrearProductoUseCase(productoRepository);
const obtenerListaProductosUseCase = new ObtenerListaProductosUseCase(productoRepository);
const obtenerTodosProductosUseCase = new ObtenerTodosProductosUseCase(productoRepository);
const obtenerProductoPorIdUseCase = new ObtenerProductoPorIdUseCase(productoRepository);
const actualizarProductoUseCase = new ActualizarProductoUseCase(productoRepository);
const eliminarProductoUseCase = new EliminarProductoUseCase(productoRepository);
const obtenerInventarioProductosUseCase = new ObtenerInventarioProductosUseCase(productoRepository);
const obtenerProductosMaximosUseCase = new ObtenerProductosMaximosUseCase(productoRepository);
const obtenerProductosMinimosUseCase = new ObtenerProductosMinimosUseCase(productoRepository);

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
//YONI
// Agregar las nuevas rutas
// productoRouter.put('/stock/:id', (req, res) => productoController.actualizarStock(req, res));
// productoRouter.put('/estado/:id', (req, res) => productoController.cambiarEstado(req, res));
//ADRIAN
productoRouter.get('/lista', (req, res) => productoController.obtenerlista(req, res));
productoRouter.get('/maximos', (req, res) => productoController.obtenerMaximos(req, res));
productoRouter.get('/minimos', (req, res) => productoController.obtenerMinimos(req, res));
export default productoRouter;