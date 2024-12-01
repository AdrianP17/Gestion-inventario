// /app/ordenes-compra/[id]/page.tsx
"use client";
import { useParams } from 'next/navigation';
import { useOrdenCompra } from '../../../hooks/useOrdenCompra';
import { formatearFecha } from '@/lib/utils';
import { IoInformationCircle } from "react-icons/io5";


export default function DetalleOrdenPage() {
    const { id } = useParams<{ id: string }>();
    const { orden, loading } = useOrdenCompra(Number(id));

    if (loading) return <p>Cargando...</p>;

    if (!orden) return <p>Orden de compra no encontrada</p>;

    return (
        <main className="px-10 pt-5">
        <div className='mb-5 bg-white rounded-2xl p-4'>
            <div className="flex gap-2 items-center mb-4">
            <IoInformationCircle className='text-primary' size={40} />
            <h1 className='text-2xl lg:text-4xl'>Detalle de la Orden de Compra</h1>
            </div>

            <div className="flex gap-4 flex-wrap mb-8">
                <div className="rounded-2xl bg-primary text-white p-6 flex flex-col items-center">
                    <p className="text-4xl mb-4">{orden.ID}</p>
                    <span className='opacity-60'>ID de la Orden</span>
                </div>
                <div className="rounded-2xl bg-primary text-white p-6 px-10 flex flex-col items-center">
                    <p className="text-4xl mb-4">{orden.NombreProveedor}</p>
                    <span className='opacity-50'>Proveedor</span>
                </div>
                <div className="rounded-2xl bg-primary text-white p-6 px-10 flex flex-col items-center">
                    <p className="text-4xl mb-4">{formatearFecha(orden.Fecha_Compra)}</p>
                    <span className='opacity-50'>Fecha de Orden</span>
                </div>
                <div className="rounded-2xl bg-primary text-white p-6 px-10 flex flex-col items-center">
                    <p className="text-4xl mb-4">{orden.Estado}</p>
                    <span className='opacity-50'>Estado</span>
                </div>
                <div className="rounded-2xl bg-primary text-white p-6 flex flex-col items-center">
                    <p className="text-4xl mb-4">$ {orden.Total_Compra}</p>
                    <span className='opacity-50'>Total</span>
                </div>
            </div>


            <div className="flex gap-2 items-center mb-4">
            <IoInformationCircle className='text-primary' size={40} />
            <h2 className='text-xl lg:text-3xl'>Detalles</h2>
            </div>
            {orden.detalles.length === 0 ? (
                <p>No hay detalles de la orden</p>
            ) : (
                <ul className="flex flex-col gap-8">
                    {orden.detalles.map((detalle, index) => (
                        <li key={index}>
                            <p>Producto: <strong>{detalle.NombreProducto}</strong></p>
                            <p>Cantidad: <strong>{detalle.Cantidad}</strong></p>
                            <p>Precio Unitario: <strong>${detalle.Precio_Unitario}</strong></p>
                            <p>Subtotal: <strong>${detalle.Subtotal}</strong></p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
        </main>
    );
}
