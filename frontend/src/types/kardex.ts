export interface Kardex {
    id: number;
    productoId: number;
    fechaMovimiento: string; // Fecha en formato ISO
    tipoMovimiento: 'Entrada' | 'Salida';
    cantidad: number;
}
