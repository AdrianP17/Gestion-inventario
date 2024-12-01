import { IDetalleSalidaRepository } from '../../../domain/repositories/IDetalleSalidaRepository';
import { DetalleSalida } from '../../../domain/entities/DetalleSalida';

export class EliminarDetalleSalidaUseCase {
    constructor(private detalleSalidaRepository: IDetalleSalidaRepository) {}

    async execute(Salida_InventarioID: number): Promise<void> {
        await this.detalleSalidaRepository.eliminarPorSalida(Salida_InventarioID);
    }
}