import { Router } from 'express';
import { ProductoController } from '../controllers/ProductoController';
import { CrearProductoUseCase } from '../../application/use-cases/producto/CrearProductoUseCase';
import { ObtenerTodosProductosUseCase } from '../../application/use-cases/producto/ObtenerTodosProductosUseCase';
import { ObtenerProductoPorIdUseCase } from '../../application/use-cases/producto/ObtenerProductoPorIdUseCase';
import { ActualizarProductoUseCase } from '../../application/use-cases/producto/ActualizarProductoUseCase';
import { EliminarProductoUseCase } from '../../application/use-cases/producto/EliminarProductoUseCase';
import { MySQLProductoRepository } from '../../infrastructure/database/mysql/MySQLProductoRepository';

const productoRouter = Router();

const productoRepository = new MySQLProductoRepository();
const crearProductoUseCase = new CrearProductoUseCase(productoRepository);
const obtenerTodosProductosUseCase = new ObtenerTodosProductosUseCase(productoRepository);
const obtenerProductoPorIdUseCase = new ObtenerProductoPorIdUseCase(productoRepository);
const actualizarProductoUseCase = new ActualizarProductoUseCase(productoRepository);
const eliminarProductoUseCase = new EliminarProductoUseCase(productoRepository);
const productoController = new ProductoController(
  crearProductoUseCase,
  obtenerTodosProductosUseCase,
  obtenerProductoPorIdUseCase,
  actualizarProductoUseCase,
  eliminarProductoUseCase
);

productoRouter.post('/', (req, res) => {
  console.log(req.body); 
  productoController.crear(req, res)});
productoRouter.get('/', (req, res) => productoController.obtenerTodosProductos(req, res));
productoRouter.get('/:id', (req, res) => productoController.obtenerPorId(req, res));
productoRouter.put('/:id', (req, res) => productoController.actualizar(req, res));
productoRouter.delete('/:id', (req, res) => productoController.eliminar(req, res));

export default productoRouter;