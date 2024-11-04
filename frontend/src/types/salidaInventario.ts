export interface SalidaInventario {
    id: number;
    fechaSalida: string; // Fecha en formato ISO
    area: string;        // Área que solicita la salida (ej. "Ventas", "Mantenimiento")
    estado: string;      // Estado de la salida (ej. "Pendiente", "Completado")
    totalSalida: number;
}
