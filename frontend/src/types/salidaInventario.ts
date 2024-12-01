import { DetalleSalida } from "./detalleSalida";
export interface SalidaInventario {
    id: number;
    fecha_registro: string; // Fecha en formato ISO
    area: string;        // Área que solicita la salida (ej. "Ventas", "Mantenimiento")
    estado: string;      // Estado de la salida (ej. "Pendiente", "Completado")
    total_salida: number;
    observaciones: string;
    detallesSalida: DetalleSalida[];
}
