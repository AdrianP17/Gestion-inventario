import { ICategoriaRepository } from '../../../domain/repositories/ICategoriaRepository';
import { Categoria } from '../../../domain/entities/Categoria';

export class CrearCategoriaUseCase {
  constructor(private categoriaRepository: ICategoriaRepository) {}

  async execute(categoria: Categoria): Promise<void> {
    // TODO: Implementar la lógica para validar y crear la categoría
    await this.categoriaRepository.crear(categoria);
  }
}
