import { DetalleCompra } from './detalleCompra';
export interface OrdenCompra {
    id: number;
    proveedorid: number;
    nombreproveedor: string;
    fecha_compra: string; // fecha en formato ISO (ej. "2024-10-25")
    estado: string;
    total_compra: number;
    detalles: DetalleCompra[];
}

