import { Request, Response } from 'express';
import { CrearOrdenSalidaInventarioUseCase } from '../../application/use-cases/orden-salida-inventario/CrearOrdenSalidaInventarioUseCase';
import { ObtenerTodasOrdenesSalidasInventarioUseCase } from '../../application/use-cases/orden-salida-inventario/ObtenerTodasOrdenesSalidasInventarioUseCase';
import { ObtenerOrdenSalidaInventarioPorIdUseCase } from '../../application/use-cases/orden-salida-inventario/ObtenerOrdenSalidaInventarioPorIdUseCase';
import { ActualizarOrdenSalidaInventarioUseCase } from '../../application/use-cases/orden-salida-inventario/ActualizarOrdenSalidaInventarioUseCase';
import { EliminarOrdenSalidaInventarioUseCase } from '../../application/use-cases/orden-salida-inventario/EliminarOrdenSalidaInventarioUseCase';
import { OrdenSalidaInventario } from '../../domain/entities/OrdenSalidaInventario';

export class OrdenSalidaInventarioController {
  constructor(
    private crearOrdenSalidaInventarioUseCase: CrearOrdenSalidaInventarioUseCase,
    private obtenerTodasOrdenesSalidasInventarioUseCase: ObtenerTodasOrdenesSalidasInventarioUseCase,
    private obtenerOrdenSalidaPorIdUseCase: ObtenerOrdenSalidaInventarioPorIdUseCase,
    private actualizarOrdenSalidaInventarioUseCase: ActualizarOrdenSalidaInventarioUseCase,
    private eliminarOrdenSalidaInventarioUseCase: EliminarOrdenSalidaInventarioUseCase
  ) {}

  // Crear orden de salida
  async crearOrdenSalidaInventario(req: Request, res: Response) {
    try {
      const data = req.body; // Asumiendo que los datos vienen en el cuerpo de la solicitud
      await this.crearOrdenSalidaInventarioUseCase.execute(data);
      res.status(201).json({ message: 'Orden de salida de inventario creada correctamente.' });
    } catch (error: unknown) {
      // Verificación explícita de que 'error' tiene la propiedad 'message'
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Error inesperado al crear la orden de salida de inventario.' });
      }
    }
  }

  // Obtener todas las órdenes de salida
  async obtenerTodasOrdenesSalidas(req: Request, res: Response) {
    try {
      const ordenes = await this.obtenerTodasOrdenesSalidasInventarioUseCase.execute();
      res.status(200).json(ordenes);
    } catch (error: unknown) {
      // Verificación explícita de que 'error' tiene la propiedad 'message'
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Error inesperado al obtener las órdenes de salida.' });
      }
    }
  }

  // Obtener orden de salida por ID
  async obtenerOrdenSalidaPorId(req: Request, res: Response) {
    const ID = parseInt(req.params.ID, 10);
    try {
      const orden = await this.obtenerOrdenSalidaPorIdUseCase.execute(ID);
      if (orden) {
        res.status(200).json(orden);
      } else {
        res.status(404).json({ message: 'Orden de salida de inventario no encontrada.' });
      }
    } catch (error: unknown) {
      // Verificación explícita de que 'error' tiene la propiedad 'message'
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Error inesperado al obtener la orden de salida.' });
      }
    }
  }

  // Actualizar orden de salida
async actualizarOrdenSalida(req: Request, res: Response) {
  const ID = parseInt(req.params.ID, 10); // Extraemos el ID de la URL
  const data = req.body; // Los datos de actualización vienen en el cuerpo

  if (!ID) {
    res.status(404).json({ message: 'Orden de Salida no encontrada' });
    return;
  }

  // Aseguramos que el ID esté dentro de los datos a actualizar
  const dataWithId = { ...data, ID };

  try {
    // Llamamos al caso de uso pasando los datos con el ID incluido
    await this.actualizarOrdenSalidaInventarioUseCase.execute(dataWithId);
    res.status(200).json({ message: 'Orden de salida de inventario actualizada correctamente.' });
  } catch (error: unknown) {
    // Verificación explícita de que 'error' tiene la propiedad 'message'
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Error inesperado al actualizar la orden de salida.' });
    }
  }
}

  // Eliminar orden de salida
  async eliminarOrdenSalida(req: Request, res: Response) {
    const ID = parseInt(req.params.ID, 10);
    try {
      await this.eliminarOrdenSalidaInventarioUseCase.execute(ID);
      res.status(200).json({ message: 'Orden de salida de inventario eliminada correctamente.' });
    } catch (error: unknown) {
      // Verificación explícita de que 'error' tiene la propiedad 'message'
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Error inesperado al eliminar la orden de salida.' });
      }
    }
  }
}