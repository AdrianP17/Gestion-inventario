export class Producto {
    constructor(
        public id: number,
        public nombre: string,
        public categoriaId: number,
        public precio: number,
        public descripcion: string,
        public marca: string,
        public modelo: string,
        public nivelMaximo: number,
        public nivelMinimo: number,
        public stockActual: number = 0, // Default 0
        public sku: string | null, // Puede ser null
        public estado: string = 'Activo' // Default 'Activo'
        public NombreCategoria?: string,
        public Stock_Actual?: number,
        public SKU?: string,
        public Estado?: string
    ) {}
}