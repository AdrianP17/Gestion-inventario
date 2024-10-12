import { Router } from 'express';
import { ProductoController } from '../controllers/ProductoController';
import { CrearProductoUseCase } from '../../application/use-cases/producto/CrearProductoUseCase';
import { ObtenerTodosProductosUseCase } from '../../application/use-cases/producto/ObtenerTodosProductosUseCase';
import { MySQLProductoRepository } from '../../infrastructure/database/mysql/MySQLProductoRepository';

const productoRouter = Router();

const productoRepository = new MySQLProductoRepository();
const crearProductoUseCase = new CrearProductoUseCase(productoRepository);
const obtenerTodosProductosUseCase = new ObtenerTodosProductosUseCase(productoRepository);
const productoController = new ProductoController(crearProductoUseCase, obtenerTodosProductosUseCase);

productoRouter.post('/', (req, res) => productoController.crear(req, res));
productoRouter.get('/', (req, res) => productoController.obtenerTodosProductos(req, res));

export default productoRouter;
