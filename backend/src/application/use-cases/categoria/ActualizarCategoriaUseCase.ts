import { ICategoriaRepository } from "../../../domain/repositories/ICategoriaRepository";
import { Categoria } from "../../../domain/entities/Categoria";

export class ActualizarCategoriaUseCase {
    constructor(private categoriaRepository: ICategoriaRepository) {}

    async execute(categoria: Categoria): Promise<void> {
        // TODO: Implementar la lógica para validar y actualizar la categoría
        await this.categoriaRepository.actualizar(categoria);
    }
}