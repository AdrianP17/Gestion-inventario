import {z} from 'zod'

export const detallePedidoSchema = z.object({
    productoId: z.string().nonempty('Debe seleccionar un producto'),
    nombreProducto: z.string().nonempty('El nombre del producto es obligatorio'),
    cantidad: z.string().refine((value) => parseInt(value) > 0, 'La cantidad debe ser al menos 1'),
    precioUnitario: z.string().refine((value) => parseFloat(value) > 0, 'El precio unitario debe ser mayor a 0'),
    subtotal: z.string(),
});

export const OrdenCompraSchema = z.object({
    proveedorId: z.string().min(1, 'El proveedor es obligatorio'),
    fechaCompra: z.string(),
    estado: z.string().min(1, 'El estado es obligatorio'),
    detalles: z.array(detallePedidoSchema),
    totalCompra: z.string().refine((value) => parseFloat(value) > 0, 'El total de la compra debe ser mayor a 0'),
})

export type OrdenCompraFormulario = z.infer<typeof OrdenCompraSchema>;
export type DetallePedido = z.infer<typeof detallePedidoSchema>;