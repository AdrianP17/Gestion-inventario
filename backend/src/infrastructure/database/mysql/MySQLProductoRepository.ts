import {IProductoRepository} from '../../../domain/repositories/IProductoRepository'
import {Producto} from '../../../domain/entities/Producto'
import { db } from './connection'; // Importar la conexión de la base de datos

export class MySQLProductoRepository implements IProductoRepository {

    async obtenerTodos(): Promise<Producto[]> {
        try {
            const [results] = await db.query('SELECT * FROM Producto');
            return results as Producto[]
          } catch (error: any) {
            throw new Error('Error al obtener los productos: ' + error.message);
          }
    }    
    async obtenerPorId(id: number): Promise<Producto | null> {
        try {
            const [results] = await db.query('SELECT * FROM Producto WHERE id = ?', [id]);
            const productos = results as Producto[];
            return productos.length > 0 ? productos[0] : null;
        } catch (error: any) {
            throw new Error('Error al obtener el producto por ID: ' + error.message);
        }
    }
    async crear(producto: Producto): Promise<void> {
        try {
            console.log(producto);
            const { nombre, categoriaId, precio, descripcion, marca, modelo, nivelMaximo, nivelMinimo } = producto;
            await db.execute(
                'INSERT INTO Producto (nombre, categoriaId, precio, descripcion, marca, modelo, nivel_Maximo, nivel_Minimo) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                [nombre, categoriaId, precio, descripcion, marca, modelo, nivelMaximo, nivelMinimo]
            );
        } catch (error: any) {
            throw new Error('Error al crear el producto: ' + error.message);
        }
    }

    async actualizar(producto: Producto): Promise<void> {
        try {
            const { id, nombre, categoriaId, precio, descripcion, marca, modelo, nivelMaximo, nivelMinimo } = producto;
            console.log(producto);
            await db.execute(
                'UPDATE Producto SET nombre = ?, categoriaId = ?, precio = ?, descripcion = ?, marca = ?, modelo = ?, nivel_Maximo = ?, nivel_Minimo = ? WHERE id = ?',
                [nombre, categoriaId, precio, descripcion, marca, modelo, nivelMaximo, nivelMinimo, id]
            );
        } catch (error: any) {
            throw new Error('Error al actualizar el producto: ' + error.message);
        }
    }

    async eliminar(id: number): Promise<void> {
        try {
            await db.execute('DELETE FROM Producto WHERE id = ?', [id]);
        } catch (error: any) {
            throw new Error('Error al eliminar el producto: ' + error.message);
        }
    }

    async obtenerPorCategoria(categoriaId: number): Promise<Producto[]> {
        try {
            const [results] = await db.query('SELECT * FROM Producto WHERE categoriaId = ?', [categoriaId]);
            return results as Producto[];
        }
        catch (error: any) {
            throw new Error('Error al obtener los productos por categoría: ' + error.message);
        }
        return []
    }
}