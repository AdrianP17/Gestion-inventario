import { Request, Response } from 'express';
import { CrearSalidaInventarioUseCase } from '../../application/use-cases/salida-inventario/CrearSalidaInventarioUseCase';
import { SalidaInventario } from '../../domain/entities/SalidaInventario';

export class SalidaInventarioController {
  constructor(private crearSalidaInventarioUseCase: CrearSalidaInventarioUseCase) {}

  async crearSalida(req: Request, res: Response): Promise<void> {
    try {
      const { fechaSalida, area, estado, totalSalida } = req.body;
      const salida = new SalidaInventario(0, fechaSalida, area, estado, totalSalida);
      await this.crearSalidaInventarioUseCase.execute(salida);
      res.status(201).send({ mensaje: 'Salida de inventario creada exitosamente' });
    } catch (error: any) {
      res.status(400).send({ error: error.message });
    }
  }
}
