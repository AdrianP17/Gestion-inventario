import { IOrdenSalidaInventarioRepository } from '../../../domain/repositories/IOrdenSalidaInventarioRepository';
import { OrdenSalidaInventario } from '../../../domain/entities/OrdenSalidaInventario';

export class CrearOrdenSalidaInventarioUseCase {
  constructor(private ordenSalidaInventarioRepository: IOrdenSalidaInventarioRepository) {}

  async execute(data: {Fecha_Registro: Date; Motivo: string; Area: string; Estado: string; Total_Salida: number; Observaciones: Text }): Promise<void> {
    // TODO: Verificar si hay suficiente stock antes de permitir la salida
    await this.ordenSalidaInventarioRepository.crear(data);
  }
}
