import { IKardexRepository } from '../../../domain/repositories/IKardexRepository';
import { Kardex } from '../../../domain/entities/Kardex';

export class RegistrarMovimientoKardexUseCase {
  constructor(private kardexRepository: IKardexRepository) {}

  async execute(movimiento: Kardex): Promise<void> {
    // TODO: Validar el tipo de movimiento y verificar cantidades
    await this.kardexRepository.registrarMovimiento(movimiento);
  }
}
