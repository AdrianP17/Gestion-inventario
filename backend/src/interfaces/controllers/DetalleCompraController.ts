import { Request, Response } from 'express';
// import { CrearDetalleCompraUseCase } from '../../application/use-cases/detalle-compra/CrearDetalleCompraUseCase';
import { DetalleCompra } from '../../domain/entities/DetalleCompra';

export class DetalleCompraController {
//   constructor(private crearDetalleCompraUseCase: CrearDetalleCompraUseCase) {}

//   async crearDetalleCompra(req: Request, res: Response): Promise<void> {
//     try {
//       const { ordenCompraId, productoId, cantidad, precioUnitario, subtotal } = req.body;
//       const detalleCompra = new DetalleCompra(0, ordenCompraId, productoId, cantidad, precioUnitario, subtotal);
//       await this.crearDetalleCompraUseCase.execute(detalleCompra);
//       res.status(201).send({ mensaje: 'Detalle de compra creado exitosamente' });
//     } catch (error) {
//       res.status(400).send({ error: error.message });
//     }
//   }
}
