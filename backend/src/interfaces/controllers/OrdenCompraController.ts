import { Request, Response } from 'express';
import { CrearOrdenCompraUseCase } from '../../application/use-cases/orden-compra/CrearOrdenCompraUseCase';
import { ActualizarOrdenCompraUseCase } from '../../application/use-cases/orden-compra/ActualizarOrdenCompraUseCase';
import { EliminarOrdenCompraUseCase } from '../../application/use-cases/orden-compra/EliminarOrdenCompraUseCase';
import { ObtenerTodasOrdenesCompraUseCase } from '../../application/use-cases/orden-compra/ObtenerTodasOrdenesCompraUseCase';
import { ObtenerOrdenCompraPorIdUseCase } from '../../application/use-cases/orden-compra/ObtenerOrdenCompraPorIdUseCase';
import { OrdenCompra } from '../../domain/entities/OrdenCompra';

export class OrdenCompraController {
  constructor(private crearOrdenCompraUseCase: CrearOrdenCompraUseCase, private actualizarOrdenCompraUseCase: ActualizarOrdenCompraUseCase, private obtenerTodasOrdenesCompraUseCase: ObtenerTodasOrdenesCompraUseCase, private eliminarOrdenCompraUseCase: EliminarOrdenCompraUseCase, private obtenerOrdenCompraPorId: ObtenerOrdenCompraPorIdUseCase) {}

  async obtenerTodos(req: Request, res: Response): Promise<void> {
    try {
      const ordenesCompra = await this.obtenerTodasOrdenesCompraUseCase.execute();
      res.json(ordenesCompra);
    } catch (error: any) {
      res.status(400).send({ error: error.message });
    }
  }



  async crear(req: Request, res: Response): Promise<void> {
    try {
      const { proveedorId, fechaCompra, estado, detalles } = req.body;
       // Valida que los campos sean correctos antes de enviarlos al caso de uso.
       const ordenCompraData = {
        proveedorId,
        fechaCompra: new Date(fechaCompra), // Asegúrate de convertir la fecha al tipo Date si es necesario.
        estado,
        detalles
    };

      await this.crearOrdenCompraUseCase.execute(ordenCompraData);
      res.status(201).send({ mensaje: 'Orden de compra creada exitosamente' });
    } catch (error: any) {
      res.status(400).send({ error: error.message });
    }
  }

  async actualizar(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    const { proveedorId, fechaCompra, estado, totalCompra } = req.body;
    console.log(proveedorId, fechaCompra, estado, totalCompra);

    try {
        await this.actualizarOrdenCompraUseCase.execute({
            id: parseInt(id),
            proveedorId,
            fechaCompra,
            estado,
            totalCompra    
        });

        res.status(200).json({ message: 'Orden de compra actualizada con éxito' });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
}

  async eliminar(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      await this.eliminarOrdenCompraUseCase.execute(parseInt(id));
      res.status(200).json({ message: 'Orden de compra eliminada con exito' });
    } catch (error: any) {
      res.status(400).send({ error: error.message });
    }
  }

  async obtenerPorId(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const ordenCompra = await this.obtenerOrdenCompraPorId.execute(Number(id));
      res.json(ordenCompra);
    } catch (error: any) {
      res.status(400).send({ error: error.message });
    }
  }
}
