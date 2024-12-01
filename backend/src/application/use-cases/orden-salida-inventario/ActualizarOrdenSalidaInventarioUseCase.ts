import { IOrdenSalidaInventarioRepository } from '../../../domain/repositories/IOrdenSalidaInventarioRepository';
import { OrdenSalidaInventario } from '../../../domain/entities/OrdenSalidaInventario';

export class ActualizarOrdenSalidaInventarioUseCase {
    constructor(private ordenSalidaInventarioRepository: IOrdenSalidaInventarioRepository) {}

    async execute(data: {ID: number; Fecha_Registro: Date; Motivo: string; Area: string; Estado: string; Total_Salida: number; Observaciones: Text }): Promise<void> {
        return await this.ordenSalidaInventarioRepository.actualizar(data);
    }
}