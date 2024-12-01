import { DetalleCompra } from './DetalleCompra';
export class OrdenCompra {
    constructor(
      public id: number,
      public proveedorID: number,
      public fechaCompra: Date,
      public estado: string,
      public totalCompra: number,
      public detallesCompra?: DetalleCompra[]
    ) {}
  }