import { Router } from 'express';
import { KardexController } from '../controllers/KardexController';
import { RegistrarMovimientoKardexUseCase } from '../../application/use-cases/kardex/RegistrarMovimientoKardexUseCase';
import { ObtenerMovimientosUseCase } from '../../application/use-cases/kardex/ObtenerMovimientosUseCase';
import { MySQLKardexRepository } from '../../infrastructure/database/mysql/MySQLKardexRepository';
import { PostgreSQLKardexRepository } from '../../infrastructure/database/postgresql/PostgreSQLKardexRepository';

const kardexRouter = Router();

const kardexRepository = new MySQLKardexRepository();
const postgresqlKardexRepository = new PostgreSQLKardexRepository();
const registrarMovimientoKardexUseCase = new RegistrarMovimientoKardexUseCase(postgresqlKardexRepository);
const obtenerMovimientosUseCase = new ObtenerMovimientosUseCase(postgresqlKardexRepository);
const kardexController = new KardexController(
  registrarMovimientoKardexUseCase,
  obtenerMovimientosUseCase
  );

kardexRouter.post('/', (req, res) => kardexController.registrarMovimiento(req, res));
kardexRouter.get('/', (req, res) => kardexController.obtenerMovimientos(req, res));

export default kardexRouter;