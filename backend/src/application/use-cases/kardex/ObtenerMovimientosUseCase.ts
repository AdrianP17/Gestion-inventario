import { IKardexRepository } from '../../../domain/repositories/IKardexRepository';
import { Kardex } from '../../../domain/entities/Kardex';

export class ObtenerMovimientosUseCase {
    constructor(private kardexRepository: IKardexRepository) {}

    async execute(): Promise<Kardex[]> {
        // TODO: Implementar la lógica para devolver los movimientos
        return await this.kardexRepository.obtenerMovimientos();
    }
}