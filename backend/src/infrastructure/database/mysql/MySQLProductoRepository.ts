import {IProductoRepository} from '../../../domain/repositories/IProductoRepository'
import {Producto} from '../../../domain/entities/Producto'
import { db } from './connection'; // Importar la conexión de la base de datos

export class MySQLProductoRepository implements IProductoRepository {

    async obtenerTodos(): Promise<Producto[]> {
        try {
            const [results] = await db.query('SELECT producto.*, Categoria.Nombre as NombreCategoria FROM producto JOIN categoria ON producto.CategoriaID = categoria.ID');
            return results as Producto[]
          } catch (error: any) {
            throw new Error('Error al obtener los productos: ' + error.message);
          }
    }    
    async obtenerLista(): Promise<{id: number, nombre: string, precio: number}[]> {
        try {
            const [productos] = await db.query(`
                SELECT 
                    ID AS id,
                    Nombre AS nombre,
                    Precio AS precio
                FROM 
                    Producto;
            `);
            return productos as {id: number, nombre: string, precio: number}[];
        } catch (error: any) {
            throw new Error('Error al obtener la lista de productos: ' + error.message);
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
    //YONI
        async actualizarStock(productoID: number, cantidad: number): Promise<void> {
        try {
            await db.execute('UPDATE Producto SET stock_Actual = ? WHERE id = ?', [cantidad, productoID]);
        } catch (error: any) {
            throw new Error('Error al actualizar el stock del producto: ' + error.message);
        }
    }

    async cambiarEstado(productoID: number, estado: string): Promise<void> {
        try {
            await db.execute('UPDATE Producto SET estado = ? WHERE id = ?', [estado, productoID]);
        } catch (error: any) {
            throw new Error('Error al cambiar el estado del producto: ' + error.message);
        }
        //ADRIAN

    async obtenerInventario(): Promise<Producto[]> {
        try {
            const [results] = await db.query(`
                SELECT 
                    producto.*,
                    Categoria.Nombre AS NombreCategoria
                FROM 
                    Producto
                JOIN 
                    Categoria ON Producto.CategoriaID = Categoria.ID
            `);
            return results as Producto[];
        } catch (error : any) {
            throw new Error('Error al obtener el inventario de productos: ' + error.message);
            
        }
    }

    async obtenerProductosDebajoDelNivelMinimo(): Promise<Producto[]> {
        try {
            const [results] = await db.query(`
                select ID, Nombre, Stock_Actual from producto
where Stock_Actual < Nivel_Minimo;
            `);
            return results as Producto[];

        } catch (error: any) {
            throw new Error('Error al obtener el inventario de productos: ' + error.message);
            
        }
    }

    async obtenerProductosArribaDelNivelMaximo(): Promise<Producto[]> {
        try {
            const [results] = await db.query(`
                select ID, Nombre, Stock_Actual from producto
where Stock_Actual > Nivel_Maximo;
            `);
            return results as Producto[];

        } catch (error: any) {
            throw new Error('Error al obtener el inventario de productos: ' + error.message);
            
        }
    }
}