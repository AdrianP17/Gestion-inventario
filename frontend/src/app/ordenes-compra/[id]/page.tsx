// /app/ordenes-compra/[id]/page.tsx
"use client";
import { useParams } from 'next/navigation';
import { useOrdenCompra } from '../../../hooks/useOrdenCompra';
import { formatearFecha } from '@/lib/utils';

export default function DetalleOrdenPage() {
    const { id } = useParams<{ id: string }>();
    const { orden, loading } = useOrdenCompra(Number(id));

    if (loading) return <p>Cargando...</p>;

    if (!orden) return <p>Orden de compra no encontrada</p>;

    return (
        <div>
            <h1>Detalle de la Orden de Compra</h1>
            <p><strong>Proveedor:</strong> {orden.NombreProveedor}</p>
            <p><strong>Fecha de Compra:</strong> {formatearFecha(orden.Fecha_Compra)}</p>
            <p><strong>Estado:</strong> {orden.Estado}</p>
            <p><strong>Total:</strong> ${orden.Total_Compra}</p>

            <h2>Detalles de la Orden</h2>
            {orden.detalles.length === 0 ? (
                <p>No hay detalles de la orden</p>
            ) : (
                <ul>
                    {orden.detalles.map((detalle) => (
                        <li key={detalle.ProductoId}>
                            <p><strong>Producto:</strong> {detalle.NombreProducto}</p>
                            <p><strong>Cantidad:</strong> {detalle.Cantidad}</p>
                            <p><strong>Precio Unitario:</strong> ${detalle.Precio_Unitario}</p>
                            <p><strong>Subtotal:</strong> ${detalle.Subtotal}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
