import { ICategoriaRepository } from '../../../domain/repositories/ICategoriaRepository';
import { Categoria } from '../../../domain/entities/Categoria';

export class ObtenerTodasCategoriasUseCase {
  constructor(private categoriaRepository: ICategoriaRepository) {}

  async execute(): Promise<Categoria[]> {
    // TODO: Implementar cualquier lógica antes de devolver todas las categorías
    return await this.categoriaRepository.obtenerTodas();
  }
}
