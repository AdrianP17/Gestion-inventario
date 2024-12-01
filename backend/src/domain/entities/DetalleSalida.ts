export class DetalleSalida {
  constructor(
    public id: number,
    public salidaInventarioId: number,
    public productoId: number,
    public cantidad: number,
    public precioUnitario: number,
    public subtotal: number,
    public estado?: string
  ) {}
}