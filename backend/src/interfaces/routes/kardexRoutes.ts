import { Router } from 'express';
import { KardexController } from '../controllers/KardexController';
import { RegistrarMovimientoKardexUseCase } from '../../application/use-cases/kardex/RegistrarMovimientoKardexUseCase';
import { ObtenerMovimientosPorProductoUseCase } from '../../application/use-cases/kardex/ObtenerMovimientosPorProductoUseCase';
import { MySQLKardexRepository } from '../../infrastructure/database/mysql/MySQLKardexRepository';

const kardexRouter = Router();

const kardexRepository = new MySQLKardexRepository();
const registrarMovimientoKardexUseCase = new RegistrarMovimientoKardexUseCase(kardexRepository);
const obtenerMovimientosPorProductoUseCase = new ObtenerMovimientosPorProductoUseCase(kardexRepository);
const kardexController = new KardexController(
  registrarMovimientoKardexUseCase,
  obtenerMovimientosPorProductoUseCase
);

kardexRouter.post('/movimiento', (req, res) => kardexController.registrarMovimiento(req, res));
kardexRouter.get('/movimientos/:productoId', (req, res) => kardexController.obtenerMovimientosPorProducto(req, res));

export default kardexRouter;