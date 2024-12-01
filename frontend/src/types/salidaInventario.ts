import { DetalleSalida } from "./detalleSalida";
export interface SalidaInventario {
    ID: number;
    Fecha_Registro: string; // Fecha en formato ISO
    Area: string;        // Área que solicita la salida (ej. "Ventas", "Mantenimiento")
    Estado: string;      // Estado de la salida (ej. "Pendiente", "Completado")
    Total_Salida: number;
    Observaciones: string;
    detallesSalida: DetalleSalida[];
}
