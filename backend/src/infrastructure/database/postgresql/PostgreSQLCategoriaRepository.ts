import { ICategoriaRepository } from "../../../domain/repositories/ICategoriaRepository";
import { Categoria } from "../../../domain/entities/Categoria";
import { db } from './connection'; // Importar la conexión de la base de datos

export class PostgreSQLCategoriaRepository implements ICategoriaRepository {
    async obtenerTodas(): Promise<Categoria[]> {
        try {
            const { rows } = await db.query('SELECT id, nombre FROM categoria');
            return rows as Categoria[];
        } catch (error: any) {
            throw new Error('Error al obtener todas las categorías: ' + error.message);
        }
    }

    async obtenerPorId(id: number): Promise<Categoria | null> {
        try {
            const { rows } = await db.query('SELECT * FROM categoria WHERE id = $1', [id]);
            return rows.length > 0 ? rows[0] : null;
        } catch (error: any) {
            throw new Error('Error al obtener la categoría por ID: ' + error.message);
        }
    }

    async crear(categoria: Categoria): Promise<void> {
        try {
            const { nombre, descripcion } = categoria;
            await db.query(
                'INSERT INTO categoria (nombre, descripcion) VALUES ($1, $2)', 
                [nombre, descripcion]
            );
        } catch (error: any) {
            throw new Error('Error al crear la categoría: ' + error.message);
        }
    }

    async actualizar(categoria: Categoria): Promise<void> {
        try {
            const { id, nombre, descripcion } = categoria;
            await db.query(
                'UPDATE categoria SET nombre = $1, descripcion = $2 WHERE id = $3', 
                [nombre, descripcion, id]
            );
        } catch (error: any) {
            throw new Error('Error al actualizar la categoría: ' + error.message);
        }
    }

    async eliminar(id: number): Promise<void> {
        try {
            await db.query('DELETE FROM categoria WHERE id = $1', [id]);
        } catch (error: any) {
            throw new Error('Error al eliminar la categoría: ' + error.message);
        }
    }
}
