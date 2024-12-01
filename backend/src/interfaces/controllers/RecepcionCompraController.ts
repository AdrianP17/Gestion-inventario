import { Request, Response } from "express";
import { ObtenerTodosRecepcionCompraUseCase } from "../../application/use-cases/recepcion-compra/ObtenerTodosRecepcionCompra";

export class RecepcionCompraController {
  constructor(private obtenerRecepcionesCompra: ObtenerTodosRecepcionCompraUseCase) {}

  async obtenerRecepciones(req: Request, res: Response) {
    try {
      const recepciones = await this.obtenerRecepcionesCompra.execute();
      console.log(recepciones);
      res.status(200).json(recepciones);
    } catch (error : any) {
      res.status(500).json({ error: 'Error interno del servidor' + error.message });
    }
  }
}
