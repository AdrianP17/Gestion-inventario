import { Request, Response } from 'express';
import { CrearOrdenCompraUseCase } from '../../application/use-cases/orden-compra/CrearOrdenCompraUseCase';
import { OrdenCompra } from '../../domain/entities/OrdenCompra';

export class OrdenCompraController {
  constructor(private crearOrdenCompraUseCase: CrearOrdenCompraUseCase) {}

  async crearOrdenCompra(req: Request, res: Response): Promise<void> {
    try {
      const { proveedorId, fechaCompra, estado, totalCompra } = req.body;
      const ordenCompra = new OrdenCompra(0, proveedorId, fechaCompra, estado, totalCompra);
      await this.crearOrdenCompraUseCase.execute(ordenCompra);
      res.status(201).send({ mensaje: 'Orden de compra creada exitosamente' });
    } catch (error: any) {
      res.status(400).send({ error: error.message });
    }
  }
}
