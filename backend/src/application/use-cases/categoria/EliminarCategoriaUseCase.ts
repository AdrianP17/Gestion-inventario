import { ICategoriaRepository } from "../../../domain/repositories/ICategoriaRepository";
import { Categoria } from "../../../domain/entities/Categoria";

export class EliminarCategoriaUseCase {
    constructor(private categoriaRepository: ICategoriaRepository) {}

    async execute(categoria: Categoria): Promise<void> {
        // TODO: Implementar la lógica para validar y eliminar la categoría
        await this.categoriaRepository.eliminar(categoria.id);
    }
}