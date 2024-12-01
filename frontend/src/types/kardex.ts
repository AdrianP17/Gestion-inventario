export interface Kardex {
    id: number;
    productoid: number;
    fechamovimiento: string; // Fecha en formato ISO
    tipomovimiento: 'Entrada' | 'Salida';
    cantidad: number;
}
