import { DetalleCompra } from './DetalleCompra';
export class OrdenCompra {
    constructor(
        public id: number, //1
        public proveedorID: number,
        public nombreProveedor: string,
        public fechaCompra: Date,
        public estado: string,
        public TotalCompra: number,
        public detallesCompra: DetalleCompra[],
    ) {}
}