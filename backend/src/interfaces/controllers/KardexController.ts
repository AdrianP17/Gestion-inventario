import { Request, Response } from 'express';
import { RegistrarMovimientoKardexUseCase } from '../../application/use-cases/kardex/RegistrarMovimientoKardexUseCase';
//Importar casos de uso de Kardex
import { Kardex } from '../../domain/entities/Kardex';

export class KardexController {
  constructor(private registrarMovimientoKardexUseCase: RegistrarMovimientoKardexUseCase) {}

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
  
}
