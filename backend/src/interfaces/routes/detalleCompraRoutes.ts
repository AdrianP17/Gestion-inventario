import { Router } from 'express';
import { DetalleCompraController } from '../controllers/DetalleCompraController';

import { MySQLDetalleCompraRepository } from '../../infrastructure/database/mysql/MySQLDetalleCompraRepository';
import { PostgreSQLDetalleCompraRepository } from '../../infrastructure/database/postgresql/PostgreSQLDetalleCompraRepository';

const detalleCompraRouter = Router();

const MySQLdetalleCompraRepository = new MySQLDetalleCompraRepository();
const PostgreSQLdetalleCompraRepository = new PostgreSQLDetalleCompraRepository();

const detalleCompraController = new DetalleCompraController(
);

// detalleCompraRouter.post('/', (req, res) => detalleCompraController.crear(req, res));
// detalleCompraRouter.get('/', (req, res) => detalleCompraController.obtenerTodosDetallesCompra(req, res));
// detalleCompraRouter.get('/:id', (req, res) => detalleCompraController.obtenerDetalleCompraPorId(req, res));
// detalleCompraRouter.put('/:id', (req, res) => detalleCompraController.actualizar(req, res));
// detalleCompraRouter.delete('/:id', (req, res) => detalleCompraController.eliminar