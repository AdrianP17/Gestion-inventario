import { Categoria } from "../entities/Categoria";
export interface ICategoriaRepository {
    obtenerTodas(): Promise<Categoria[]>;
    obtenerPorId(id: number): Promise<Categoria | null>;
    crear(categoria: Categoria): Promise<void>;
    actualizar(categoria: Categoria): Promise<void>;
    eliminar(id: number): Promise<void>;
  }
  