import {z} from 'zod'

export const detallePedidoSchema = z.object({
    productoId: z.number().min(1, 'Debe seleccionar un producto'),
    nombreProducto: z.string().nonempty('El nombre del producto es obligatorio'),
    cantidad: z.number().min(1, 'La cantidad debe ser al menos 1'),
    precioUnitario: z.number().min(0.01, 'El precio unitario debe ser mayor a 0'),
    subtotal: z.number(),
});

export const OrdenCompraSchema = z.object({
    proveedorID: z.number().min(1, 'El proveedor es obligatorio'),
    fechaCompra: z.string(),
    estado: z.string().min(1, 'El estado es obligatorio'),
    detalles: z.array(detallePedidoSchema),
    totalCompra: z.number().positive(),
})

export type OrdenCompraFormulario = z.infer<typeof OrdenCompraSchema>;
export type DetallePedido = z.infer<typeof detallePedidoSchema>;