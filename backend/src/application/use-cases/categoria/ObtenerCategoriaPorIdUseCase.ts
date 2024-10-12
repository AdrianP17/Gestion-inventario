import { ICategoriaRepository } from "../../../domain/repositories/ICategoriaRepository";
import { Categoria } from "../../../domain/entities/Categoria";

export class ObtenerCategoriaPorIdUseCase {
    constructor(private categoriaRepository: ICategoriaRepository) {}

    async execute(id: number): Promise<Categoria | null> {
        return await this.categoriaRepository.obtenerPorId(id);
    }
}