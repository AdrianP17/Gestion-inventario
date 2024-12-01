import React from 'react'
import { Producto } from '@/types/producto'
import { GoAlertFill } from "react-icons/go";
interface Props {
    productos: Pick<Producto, 'id' | 'nombre' | 'stock_actual'>[],
    children?: React.ReactNode
}
function ListaProductos( { productos, children }: Props ) {
  return (
    <div className='flex flex-col gap-6'>
        {productos.map((producto) => (
            <div key={producto.id} className='flex gap-4'>
                {children}
                <div className=''>
                <p>ID: {producto.id}</p>
                <p>{producto.nombre}</p>
                <p className='font-semibold'>{producto.stock_actual} {producto.stock_actual === 1 ? 'Unidad' : 'Unidades'} </p>
                </div>
            </div>
        ))}
    </div>
  )
}

export default ListaProductos