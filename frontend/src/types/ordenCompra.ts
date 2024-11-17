import { DetalleCompra } from './detalleCompra';
export interface OrdenCompra {
    ID: number;
    ProveedorId: number;
    NombreProveedor: string;
    Fecha_Compra: string; // Fecha en formato ISO (ej. "2024-10-25")
    Estado: string;
    Total_Compra: number;
    detalles: DetalleCompra[];
}
