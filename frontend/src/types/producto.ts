export interface Producto {
    ID: number;
    Nombre: string;
    CategoriaId: number;
    Precio: number;
    Descripcion?: string;
    Marca?: string;
    Modelo?: string;
    Nivel_Maximo: number;
    Nivel_Minimo: number;
    Stock_Actual?: number;
    NombreCategoria?: string;
}