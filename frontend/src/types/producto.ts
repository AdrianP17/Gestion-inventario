export interface Producto {
    id: number;
    nombre: string;
    categoriaid: number;
    precio: number;
    descripcion?: string;
    marca?: string;
    modelo?: string;
    nivel_maximo: number;
    nivel_minimo: number;
    stock_actual?: number;
    nombre_categoria?: string;
}