export class DetalleCompra {
  constructor(
    public id: number,
    public ordenCompraId: number,
    public productoId: number,
    public cantidad: number,
    public precioUnitario: number,
    public subtotal: number
  ) {}
}