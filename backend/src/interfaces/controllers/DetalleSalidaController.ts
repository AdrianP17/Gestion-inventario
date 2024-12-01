import { Request, Response } from "express";
import { CrearDetalleSalidaUseCase } from "../../application/use-cases/detalle-salida/CrearDetalleSalidaUseCase";
import { EliminarDetalleSalidaUseCase } from "../../application/use-cases/detalle-salida/EliminarDetalleSalidaUseCase";
import { ObtenerPorSalidaUseCase } from "../../application/use-cases/detalle-salida/ObtenerPorSalidaUseCase";
import { ActualizarDetalleSalidaUseCase } from "../../application/use-cases/detalle-salida/ActualizarDetalleSalidaUseCase";
import { DetalleSalida } from "../../domain/entities/DetalleSalida";

export class DetalleSalidaController {
  constructor(
    private crearDetalleSalidaUseCase: CrearDetalleSalidaUseCase,
    private obtenerPorSalidaUseCase: ObtenerPorSalidaUseCase,
    private actualizarDetalleSalidaUseCase: ActualizarDetalleSalidaUseCase,
    private eliminarDetalleSalidaUseCase: EliminarDetalleSalidaUseCase
  ) {}

  // Crear un nuevo detalle de salida
  async crear(req: Request, res: Response): Promise<void> {
    try {
      const { Salida_InventarioID, ProductoID, Cantidad, Precio_Unitario, Subtotal, Estado } = req.body;

      // Llamamos al caso de uso para crear el detalle
      await this.crearDetalleSalidaUseCase.execute({
        Salida_InventarioID,
        ProductoID,
        Cantidad,
        Precio_Unitario,
        Subtotal,
        Estado,
      });

      res.status(201).json({ message: "Detalle de salida creado exitosamente." });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // Obtener los detalles de salida por el ID de la orden de salida
  async obtenerPorSalida(req: Request, res: Response): Promise<void> {
    try {
      const { Salida_InventarioID } = req.params;

      const detalles = await this.obtenerPorSalidaUseCase.execute(Number(Salida_InventarioID));

      if (!detalles) {
        res.status(404).json({ message: "Detalles de salida no encontrados." });
        return;
      }

      res.status(200).json(detalles);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

    // Actualizar detalle de salida
    async actualizar(req: Request, res: Response): Promise<void> {
        const Salida_InventarioID = parseInt(req.params.Salida_InventarioID, 10); // Obtenemos Salida_InventarioID desde los parámetros de la URL
        const data = req.body; // Los datos de actualización vienen en el cuerpo de la solicitud
    
        // Verificamos que el ID esté presente
        if (!Salida_InventarioID) {
        res.status(404).json({ message: 'Detalle de Salida no encontrado' });
        return;
        }
    
        try {
        // Llamamos al caso de uso para actualizar el detalle
        await this.actualizarDetalleSalidaUseCase.execute(data);
        // Respuesta exitosa
        res.status(200).json({ message: 'Detalle de salida actualizado correctamente.' });
        } catch (error: unknown) {
        // Verificación explícita de que 'error' tiene la propiedad 'message'
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Error inesperado al actualizar el detalle de salida.' });
        }
        }
    }  

  // Eliminar un detalle de salida por su Salida_InventarioID
  async eliminar(req: Request, res: Response): Promise<void> {
    try {
      const { Salida_InventarioID } = req.params;

      // Llamamos al caso de uso para eliminar el detalle
      await this.eliminarDetalleSalidaUseCase.execute(Number(Salida_InventarioID));

      res.status(200).json({ message: "Detalle de salida eliminado exitosamente." });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
