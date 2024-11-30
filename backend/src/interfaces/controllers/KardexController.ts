import { Request, Response } from 'express';
import { RegistrarMovimientoKardexUseCase } from '../../application/use-cases/kardex/RegistrarMovimientoKardexUseCase';
import { ObtenerMovimientosUseCase } from '../../application/use-cases/kardex/ObtenerMovimientosUseCase';
//Importar casos de uso de Kardex
import { Kardex } from '../../domain/entities/Kardex';

export class KardexController {
  constructor(private registrarMovimientoKardexUseCase: RegistrarMovimientoKardexUseCase, private obtenerMovimientosUseCase: ObtenerMovimientosUseCase) {}

  async registrarMovimiento(req: Request, res: Response): Promise<void> {
    try {
      const { productoId, fechaMovimiento, tipoMovimiento, cantidad } = req.body;
      const movimiento = new Kardex(0, productoId, fechaMovimiento, tipoMovimiento, cantidad);
      await this.registrarMovimientoKardexUseCase.execute(movimiento);
      res.status(201).send({ mensaje: 'Movimiento de Kardex registrado exitosamente' });
    } catch (error: any) {
      res.status(400).send({ error: error.message });
    }
  }

  async obtenerMovimientos(req: Request, res: Response): Promise<void> {
    try {
      const movimientos = await this.obtenerMovimientosUseCase.execute();
      res.json(movimientos);
    } catch (error: any) {
      res.status(400).send({ error: error.message });
    }
  }
  
}
